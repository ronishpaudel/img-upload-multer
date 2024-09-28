import express, { Request, Response, NextFunction } from "express";
import multer, { FileFilterCallback } from "multer";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import net from "net";
import fs from "fs";

const DEFAULT_PORT = 3000;
const app = express();

const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir); // Create the uploads folder if it doesn't exist
  console.log("Created uploads directory");
}

// Serve the "public" folder for static files (like index.html)
app.use(express.static("public"));

// Serve the "uploads" folder for serving the uploaded images
app.use("/uploads", express.static("uploads"));

// set storage with multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(`Storing image in the 'uploads' directory`); //logs
    cb(null, "uploads/"); // Set destination folder for uploaded images
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${uuidv4()}${path.extname(file.originalname)}`;
    console.log(`Generating unique filename: ${uniqueSuffix}`); // Logs
    cb(null, uniqueSuffix); // Generate a unique file name
  },
});

//filter to allow only image uploads
const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  const allowedMimeTypes = ["image/jpeg", "image/png", "image/gif"];
  console.log(`Validating file type: ${file.mimetype}`); //Logs

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    console.error("Invalid file type uploaded.");
    cb(new Error("Invalid file type. Only JPEG, PNG, and GIF are allowed."));
  }
};

//init multer with storage and file filter
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 1024 * 1024 * 5 }, //Limit size to 5MB
});

// Post route for image upload

app.post(
  "/upload",
  upload.single("image"),
  (req: Request, res: Response, next: NextFunction): void => {
    console.log("Received image upload request");

    if (!req.file) {
      console.error("No file uploaded");
      res.status(400).json({ error: "Please upload an image file" });
      return;
    }

    const filePath = `/uploads/${req.file.filename}`;
    console.log(`Image uploaded successfully: ${req.file.filename}`);

    res.json({
      message: "Image uploaded successfully",
      filePath,
    });

    console.log("Response sent to client with image path");
    return;
  }
);

// Function to check if a port is available
const checkPort = (port: number): Promise<number> => {
  return new Promise((resolve) => {
    const server = net.createServer();

    server.once("error", (err: any) => {
      if (err.code === "EADDRINUSE") {
        console.log(`Port ${port} is in use, trying port ${port + 1}...`);
        resolve(checkPort(port + 1)); // Try next port
      } else {
        console.error("Error while checking port availability", err);
      }
    });

    server.once("listening", () => {
      server.close();
      resolve(port); //Port is available
    });

    server.listen(port);
  });
};

// Start the server on the available port
const startServer = async () => {
  const availablePort = await checkPort(DEFAULT_PORT);
  app.listen(availablePort, () => {
    console.log(`Server is running on http://localhost:${availablePort}`);
  });
};

startServer();