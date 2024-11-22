import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url'; // Digunakan untuk menggantikan __dirname

// Ambil __filename dan __dirname dalam konteks ES6
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Setup storage untuk multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../src/public')); // Folder untuk menyimpan file upload
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Nama file unik berdasarkan timestamp
  }
});

// Konfigurasi multer
const upload = multer({
  storage: storage,
  limits: { fileSize: 10000000 }, // Batas ukuran file: 10MB
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/; // Format file yang diizinkan
    const mimeType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());

    if (mimeType && extname) {
      return cb(null, true);
    }
    cb(new Error('File type is not supported')); // Jika format tidak sesuai, munculkan error
  }
});

export default upload;
