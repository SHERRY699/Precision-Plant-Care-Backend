// utils/multer.js
import multer from 'multer';
const storage = multer.memoryStorage(); // store image in memory buffer
const upload = multer({ storage });
export default upload;
