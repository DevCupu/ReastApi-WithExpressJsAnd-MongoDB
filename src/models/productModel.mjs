import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Nama produk,
  description: { type: String, required: true }, // Deskripsi produk
  price: { type: Number, required: true, min: 0 }, // Harga produk, harus >= 0
  stock: { type: Number, required: true, min: 0 }, // Stok produk, harus >= 0
  image: { type: String },
  createdAt: { type: Date, default: Date.now }, // Tanggal dibuat
});

const Product = mongoose.model('Product', productSchema);

export default Product;
