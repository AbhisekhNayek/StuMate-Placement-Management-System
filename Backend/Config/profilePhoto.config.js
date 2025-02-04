import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

// Resolve the current directory path (for ES modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../public/profileImgs/');
    cb(null, uploadPath); // Folder to save uploaded profile images
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const extension = path.extname(file.originalname).toLowerCase();
    cb(null, `${timestamp}${extension}`); // Unique file name with timestamp
  },
});

// Multer instance for profile image uploads
const uploadUserProfile = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
  fileFilter: (req, file, cb) => {
    // Only accept JPG, JPEG, and PNG file formats
    const allowedFileTypes = /jpg|jpeg|png/;
    const isValidExtension = allowedFileTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const isValidMimeType = allowedFileTypes.test(file.mimetype);

    if (isValidExtension && isValidMimeType) {
      cb(null, true); // Accept file
    } else {
      cb(new Error('Only JPG, JPEG, or PNG files are allowed!'), false); // Reject file
    }
  },
});

export default uploadUserProfile;
