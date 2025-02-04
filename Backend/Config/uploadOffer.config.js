import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

// Resolve the current directory path (for ES modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure storage for offer letter uploads
const offerLetterStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../public/offerLetter/');
    cb(null, uploadPath); // Folder to save offer letters
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const extension = path.extname(file.originalname).toLowerCase();
    cb(null, `${timestamp}${extension}`); // Unique file name with timestamp
  },
});

// File filter to allow only PDF, DOC, and DOCX files
const fileFilter = (req, file, cb) => {
  const allowedFileTypes = /pdf|doc|docx/;
  const isValidExtension = allowedFileTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const isValidMimeType = allowedFileTypes.test(file.mimetype);

  if (isValidExtension && isValidMimeType) {
    cb(null, true); // Accept file
  } else {
    cb(new Error('Only PDF, DOC, or DOCX files are allowed!'), false); // Reject file
  }
};

// Multer instance for offer letter uploads
const uploadOfferLetter = multer({
  storage: offerLetterStorage,
  limits: { fileSize: 10 * 1024 * 1024 }, // File size limit: 10MB
  fileFilter,
});

export default uploadOfferLetter;
