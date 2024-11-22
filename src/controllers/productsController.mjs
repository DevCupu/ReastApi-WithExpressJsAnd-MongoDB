import Product from '../models/productModel.mjs';
import upload from '../config/multerConfig.mjs';

// Function Create Product
export const createProduct = async (req, res) => {
    try {
        const { name, description, price, stock } = req.body;

        if (!req.file || !name || !description || !price || !stock) {
            return res.status(400).json({ message: 'All fields are required!' });
        }

        const image = req.file.path;
        const newProduct = new Product({ name, description, price, stock, image });
        
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Function All Products
export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().select('-__v');
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Function Get ProductById
export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found!' });
        }
        res.json(product);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Function Update ProductById
export const updateProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found!' });
        }

        const { name, description, price, stock } = req.body;

        if (name) product.name = name;
        if (description) product.description = description;
        if (price) product.price = price;
        if (stock) product.stock = stock;

        if (req.file) {
            product.image = req.file.path;
        }

        await product.save();
        res.json(product);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Function Delete ProductById
export const deleteProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found!' });
        }
        await Product.deleteOne({ _id: req.params.id });
        res.json({ message: 'Product deleted!' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
