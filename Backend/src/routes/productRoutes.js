import express from 'express';
import { getProducts, getProductById, createProduct } from '../controllers/productController.js';
import { upload } from '../config/cloudinary.js';

const router = express.Router();

// Route: GET /api/products
router.route('/').get(getProducts);

// Route: POST /api/products (Expects a file named 'image' for Cloudinary upload)
router.route('/').post(upload.single('image'), createProduct);

// Route: GET /api/products/:id
router.route('/:id').get(getProductById);

export default router;
