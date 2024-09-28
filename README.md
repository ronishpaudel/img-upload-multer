# Image Uploader using Multer

A simple and responsive web application for uploading and displaying images. This project allows users to upload multiple images, preview them before submission, and view the uploaded images.

## Features

- Drag and drop file upload
- Multiple file selection
- Image preview before upload
- Responsive design using Tailwind CSS
- File type validation (JPEG, PNG, GIF)
- File size limit (5MB per file)
- Server-side image storage
- Unique filename generation for uploaded images

## Technologies Used

### Frontend:

- HTML5
- JavaScript (ES6+)
- Tailwind CSS

### Backend:

- Node.js
- Express.js
- TypeScript
- Multer (for handling file uploads)

## Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/image-uploader.git
   cd image-uploader
   ```

2. Install dependencies:

```bash
npm install
```

3. Create an uploads directory in the project root(if not it will be created as soon as you start the):

```bash
mkdir uploads
```

### Usauge

1. Start the server

```bash
npm run dev
```

2. Open your web browser and navigate to http://localhost:3000 (or the port shown in the console).

3. Use the interface to upload images:

- the upload area or drag and drop files to select images.
- Preview selected images before uploading.
- Click the "Upload" button to submit the images.
- View the uploaded images in the "Uploaded Images" section below the form.

### Configuration

You can modify the following settings in the server.ts file:

- DEFAULT_PORT: Change the default port number (currently set to 3000).
- File size limit: Modify the limits option in the Multer configuration (currently set to 5MB).
- Allowed file types: Update the allowedMimeTypes array in the fileFilter function.

### Limitations

- Maximum file size: 5MB per image
- Supported file types: JPEG, PNG, GIF
- Maximum number of files per upload: 10

### Error Handling

- The application provides user-friendly error messages for common issues such as file size exceeded and invalid file types.
- Errors are displayed on the frontend for a better user experience.

```bash
This `README.md` is ready for your GitHub project, providing a comprehensive overview of the features, setup, and usage instructions for the image uploader using Multer.

```
