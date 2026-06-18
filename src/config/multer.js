import multer from "multer";

/**
 * Multer storage configuration
 * memoryStorage keeps uploaded files in RAM as Buffer
 * (useful when sending files directly to cloud services like ImageKit, S3, etc.)
 */
const storage = multer.memoryStorage();

/**
 * Multer middleware instance for handling file uploads
 * Files will be stored temporarily in memory (req.file / req.files)
 */
export const upload = multer({ storage: storage });