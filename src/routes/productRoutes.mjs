import express from "express";
import {
    createProduct,
    getAllProducts,
    getProductById,
    updateProductById,
    deleteProductById
} from "../controllers/productsController.mjs";

import upload from '../config/multerConfig.mjs';

const router = express.Router();

// Create product - POST
router.post('/', upload.single('image'), createProduct);

// Get all products - GET
router.get('/', getAllProducts);

// Get product by ID - GET (dengan parameter ID)
router.get('/:id', getProductById);

// Update product by ID - PUT (dengan parameter ID)
router.put('/:id', upload.single('image'), updateProductById);

// Delete product by ID - DELETE (dengan parameter ID)
router.delete('/:id', deleteProductById);

// Pastikan untuk mengekspor router yang benar
export default router;
