import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url'; 
import { connectDB } from './src/config/db.mjs';
import productRoutes from './src/routes/productRoutes.mjs';
import errorHandler from './src/utils/errorHandler.mjs';
import upload from './src/config/multerConfig.mjs'; // Mengimpor konfigurasi multer

const app = express();
const port = process.env.PORT || 8080;

// Ambil __dirname dalam ES6
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware untuk static file (Pastikan path memiliki garis miring di depan "/src/public")
app.use("/src/public", express.static(path.join(__dirname, "src/public")));

// Connect to DB
connectDB();

// Routes dengan upload single file
// Gunakan middleware upload.single('image') hanya di rute yang membutuhkan upload gambar
app.post('/api/products', upload.single('image'), productRoutes);

// Penanganan Error (Letakkan setelah rute untuk menangkap semua error dari rute)
app.use(errorHandler);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
