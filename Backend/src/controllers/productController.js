import prisma from '../config/db.js';

// @desc    Get all products
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get a single product by ID
// @route   GET /api/products/:id
// @access  Public
export const getProductById = async (req, res) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: req.params.id },
    });

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Create a new product (Will be used by Admin Panel)
// @route   POST /api/products
// @access  Private/Admin
export const createProduct = async (req, res) => {
  try {
    const { 
      id, name, slug, category, price, originalPrice, 
      description, shortDescription, images, colors, 
      materials, careInstructions, sizes, inStock, 
      stockCount, deliveryDays, weight, tags 
    } = req.body;
    
    // We already have image URLs in the `images` array from the frontend.
    // If there is an uploaded file, add it to the images array.
    const finalImages = images || [];
    if (req.file) {
      finalImages.push(req.file.path);
    }

    const newProduct = await prisma.product.create({
      data: {
        id: id || undefined, // use provided id if available
        name,
        slug,
        category,
        price: parseFloat(price),
        originalPrice: originalPrice ? parseFloat(originalPrice) : null,
        description,
        shortDescription,
        images: finalImages,
        colors: colors || [],
        materials: materials || [],
        careInstructions: careInstructions || [],
        sizes: sizes || [],
        inStock: inStock !== undefined ? inStock : true,
        stockCount: parseInt(stockCount, 10) || 1,
        deliveryDays,
        weight,
        tags: tags || [],
      },
    });

    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ message: 'Server Error: Could not create product', details: error.message });
  }
};
