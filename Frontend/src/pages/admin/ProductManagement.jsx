import { useState, useMemo } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { formatPrice } from '../../utils/formatPrice';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Plus,
  Edit3,
  Trash2,
  X,
  Upload,
  Image as ImageIcon,
  AlertTriangle,
} from 'lucide-react';
import toast from 'react-hot-toast';

const EMPTY_PRODUCT = {
  name: '',
  category: '',
  price: '',
  originalPrice: '',
  description: '',
  shortDescription: '',
  images: [''],
  sizes: [{ label: 'Standard', diameter: '', price: '' }],
  colors: [''],
  materials: [''],
  careInstructions: [''],
  inStock: true,
  stockCount: 1,
  deliveryDays: '7-10 business days',
  weight: '',
  tags: [],
};

export default function ProductManagement() {
  const { products, categories, addProduct, updateProduct, deleteProduct } = useAdmin();
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [formData, setFormData] = useState(EMPTY_PRODUCT);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.id.toLowerCase().includes(search.toLowerCase());
      const matchCategory = categoryFilter === 'all' || p.category === categoryFilter;
      return matchSearch && matchCategory;
    });
  }, [products, search, categoryFilter]);

  const openAddModal = () => {
    setEditProduct(null);
    setFormData({ ...EMPTY_PRODUCT, images: [''], colors: [''], materials: [''], careInstructions: [''], sizes: [{ label: 'Standard', diameter: '', price: '' }] });
    setShowModal(true);
  };

  const openEditModal = (product) => {
    setEditProduct(product);
    setFormData({
      ...product,
      originalPrice: product.originalPrice || '',
      images: product.images.length > 0 ? [...product.images] : [''],
      colors: product.colors?.length > 0 ? [...product.colors] : [''],
      materials: product.materials?.length > 0 ? [...product.materials] : [''],
      careInstructions: product.careInstructions?.length > 0 ? [...product.careInstructions] : [''],
      sizes: product.sizes?.length > 0 ? product.sizes.map((s) => ({ ...s })) : [{ label: '', diameter: '', price: '' }],
      tags: product.tags || [],
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditProduct(null);
    setFormData(EMPTY_PRODUCT);
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleArrayChange = (field, index, value) => {
    setFormData((prev) => {
      const arr = [...prev[field]];
      arr[index] = value;
      return { ...prev, [field]: arr };
    });
  };

  const addArrayItem = (field, defaultValue = '') => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], defaultValue],
    }));
  };

  const removeArrayItem = (field, index) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const handleSizeChange = (index, key, value) => {
    setFormData((prev) => {
      const sizes = [...prev.sizes];
      sizes[index] = { ...sizes[index], [key]: value };
      return { ...prev, sizes };
    });
  };

  const addSize = () => {
    setFormData((prev) => ({
      ...prev,
      sizes: [...prev.sizes, { label: '', diameter: '', price: '' }],
    }));
  };

  const removeSize = (index) => {
    setFormData((prev) => ({
      ...prev,
      sizes: prev.sizes.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.category || !formData.price) {
      toast.error('Name, category, and price are required');
      return;
    }

    const productData = {
      ...formData,
      price: Number(formData.price),
      originalPrice: formData.originalPrice ? Number(formData.originalPrice) : null,
      stockCount: Number(formData.stockCount) || 0,
      images: formData.images.filter((img) => img.trim()),
      colors: formData.colors.filter((c) => c.trim()),
      materials: formData.materials.filter((m) => m.trim()),
      careInstructions: formData.careInstructions.filter((c) => c.trim()),
      sizes: formData.sizes
        .filter((s) => s.label && s.price)
        .map((s) => ({ ...s, price: Number(s.price) })),
      tags: typeof formData.tags === 'string'
        ? formData.tags.split(',').map((t) => t.trim()).filter(Boolean)
        : formData.tags,
    };

    if (editProduct) {
      updateProduct({ ...editProduct, ...productData });
      toast.success('Product updated successfully');
    } else {
      addProduct(productData);
      toast.success('Product added successfully');
    }

    closeModal();
  };

  const handleDelete = (id) => {
    deleteProduct(id);
    setDeleteConfirm(null);
    toast.success('Product deleted');
  };

  return (
    <div className="admin-products">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Products</h1>
          <p className="admin-page-subtitle">Manage your art collection</p>
        </div>
        <button className="admin-primary-btn" onClick={openAddModal}>
          <Plus size={18} />
          Add Product
        </button>
      </div>

      {/* Toolbar */}
      <div className="admin-toolbar">
        <div className="admin-search">
          <Search size={18} className="admin-search-icon" />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="admin-search-input"
          />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="admin-select"
        >
          <option value="all">All Categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <p className="admin-result-count">
        Showing {filteredProducts.length} of {products.length} products
      </p>

      {/* Product Grid */}
      <div className="admin-product-grid">
        {filteredProducts.map((product) => (
          <motion.div
            key={product.id}
            className="admin-product-card"
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="admin-product-card-img">
              <img src={product.images[0]} alt={product.name} />
              {!product.inStock && (
                <span className="admin-product-oos-badge">Out of Stock</span>
              )}
              {product.isNew && (
                <span className="admin-product-new-badge">New</span>
              )}
            </div>
            <div className="admin-product-card-body">
              <p className="admin-product-card-category">{product.category}</p>
              <h3 className="admin-product-card-name">{product.name}</h3>
              <div className="admin-product-card-price-row">
                <span className="admin-product-card-price">{formatPrice(product.price)}</span>
                {product.originalPrice && (
                  <span className="admin-product-card-original">{formatPrice(product.originalPrice)}</span>
                )}
              </div>
              <div className="admin-product-card-meta">
                <span>Stock: {product.stockCount}</span>
                <span>⭐ {product.rating} ({product.reviewCount})</span>
              </div>
              <div className="admin-product-card-actions">
                <button
                  className="admin-edit-btn"
                  onClick={() => openEditModal(product)}
                >
                  <Edit3 size={15} /> Edit
                </button>
                <button
                  className="admin-delete-btn"
                  onClick={() => setDeleteConfirm(product)}
                >
                  <Trash2 size={15} /> Delete
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="admin-empty-state">
          <ImageIcon size={48} />
          <p>No products found</p>
        </div>
      )}

      {/* Delete Confirmation */}
      <AnimatePresence>
        {deleteConfirm && (
          <motion.div
            className="admin-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setDeleteConfirm(null)}
          >
            <motion.div
              className="admin-modal admin-modal-sm"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="admin-confirm-icon">
                <AlertTriangle size={32} />
              </div>
              <h3 className="admin-confirm-title">Delete Product?</h3>
              <p className="admin-confirm-text">
                Are you sure you want to delete "<strong>{deleteConfirm.name}</strong>"? This action cannot be undone.
              </p>
              <div className="admin-confirm-actions">
                <button className="admin-cancel-btn" onClick={() => setDeleteConfirm(null)}>
                  Cancel
                </button>
                <button className="admin-danger-btn" onClick={() => handleDelete(deleteConfirm.id)}>
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add/Edit Product Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="admin-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="admin-modal admin-modal-lg"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="admin-modal-header">
                <h2 className="admin-modal-title">
                  {editProduct ? 'Edit Product' : 'Add New Product'}
                </h2>
                <button className="admin-modal-close" onClick={closeModal}>
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="admin-modal-body admin-product-form">
                {/* Basic Info */}
                <div className="admin-form-section">
                  <h3 className="admin-form-section-title">Basic Information</h3>
                  <div className="admin-form-grid">
                    <div className="admin-form-group full-width">
                      <label>Product Name *</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        placeholder="e.g. Forest Mandala Plate"
                        required
                      />
                    </div>
                    <div className="admin-form-group">
                      <label>Category *</label>
                      <select
                        value={formData.category}
                        onChange={(e) => handleChange('category', e.target.value)}
                        required
                      >
                        <option value="">Select Category</option>
                        {categories.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                    <div className="admin-form-group">
                      <label>Price (₹) *</label>
                      <input
                        type="number"
                        value={formData.price}
                        onChange={(e) => handleChange('price', e.target.value)}
                        placeholder="1800"
                        required
                      />
                    </div>
                    <div className="admin-form-group">
                      <label>Original Price (₹)</label>
                      <input
                        type="number"
                        value={formData.originalPrice}
                        onChange={(e) => handleChange('originalPrice', e.target.value)}
                        placeholder="2200 (for discount)"
                      />
                    </div>
                    <div className="admin-form-group">
                      <label>Stock Count</label>
                      <input
                        type="number"
                        value={formData.stockCount}
                        onChange={(e) => handleChange('stockCount', e.target.value)}
                        min="0"
                      />
                    </div>
                  </div>
                  <div className="admin-form-group">
                    <label>Short Description</label>
                    <input
                      type="text"
                      value={formData.shortDescription}
                      onChange={(e) => handleChange('shortDescription', e.target.value)}
                      placeholder="Brief tagline for the product"
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Full Description</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => handleChange('description', e.target.value)}
                      rows={4}
                      placeholder="Detailed product description..."
                    />
                  </div>
                </div>

                {/* Images */}
                <div className="admin-form-section">
                  <h3 className="admin-form-section-title">
                    <ImageIcon size={16} /> Images
                  </h3>
                  {formData.images.map((img, i) => (
                    <div key={i} className="admin-form-array-row">
                      <input
                        type="text"
                        value={img}
                        onChange={(e) => handleArrayChange('images', i, e.target.value)}
                        placeholder="Image URL"
                      />
                      {formData.images.length > 1 && (
                        <button type="button" className="admin-remove-btn" onClick={() => removeArrayItem('images', i)}>
                          <X size={16} />
                        </button>
                      )}
                    </div>
                  ))}
                  <button type="button" className="admin-add-row-btn" onClick={() => addArrayItem('images')}>
                    <Plus size={14} /> Add Image URL
                  </button>
                </div>

                {/* Sizes */}
                <div className="admin-form-section">
                  <h3 className="admin-form-section-title">Sizes</h3>
                  {formData.sizes.map((size, i) => (
                    <div key={i} className="admin-form-size-row">
                      <input
                        type="text"
                        value={size.label}
                        onChange={(e) => handleSizeChange(i, 'label', e.target.value)}
                        placeholder="Label (e.g. Small)"
                      />
                      <input
                        type="text"
                        value={size.diameter}
                        onChange={(e) => handleSizeChange(i, 'diameter', e.target.value)}
                        placeholder="Dimensions"
                      />
                      <input
                        type="number"
                        value={size.price}
                        onChange={(e) => handleSizeChange(i, 'price', e.target.value)}
                        placeholder="Price"
                      />
                      {formData.sizes.length > 1 && (
                        <button type="button" className="admin-remove-btn" onClick={() => removeSize(i)}>
                          <X size={16} />
                        </button>
                      )}
                    </div>
                  ))}
                  <button type="button" className="admin-add-row-btn" onClick={() => addSize()}>
                    <Plus size={14} /> Add Size
                  </button>
                </div>

                {/* Colors */}
                <div className="admin-form-section">
                  <h3 className="admin-form-section-title">Colors</h3>
                  {formData.colors.map((color, i) => (
                    <div key={i} className="admin-form-array-row">
                      <input
                        type="text"
                        value={color}
                        onChange={(e) => handleArrayChange('colors', i, e.target.value)}
                        placeholder="e.g. Teal & Gold"
                      />
                      {formData.colors.length > 1 && (
                        <button type="button" className="admin-remove-btn" onClick={() => removeArrayItem('colors', i)}>
                          <X size={16} />
                        </button>
                      )}
                    </div>
                  ))}
                  <button type="button" className="admin-add-row-btn" onClick={() => addArrayItem('colors')}>
                    <Plus size={14} /> Add Color
                  </button>
                </div>

                {/* Additional */}
                <div className="admin-form-section">
                  <h3 className="admin-form-section-title">Additional Details</h3>
                  <div className="admin-form-grid">
                    <div className="admin-form-group">
                      <label>Weight</label>
                      <input
                        type="text"
                        value={formData.weight}
                        onChange={(e) => handleChange('weight', e.target.value)}
                        placeholder="e.g. 450g"
                      />
                    </div>
                    <div className="admin-form-group">
                      <label>Delivery Time</label>
                      <input
                        type="text"
                        value={formData.deliveryDays}
                        onChange={(e) => handleChange('deliveryDays', e.target.value)}
                        placeholder="7-10 business days"
                      />
                    </div>
                    <div className="admin-form-group">
                      <label>Tags (comma separated)</label>
                      <input
                        type="text"
                        value={Array.isArray(formData.tags) ? formData.tags.join(', ') : formData.tags}
                        onChange={(e) => handleChange('tags', e.target.value)}
                        placeholder="mandala, wall-art, handmade"
                      />
                    </div>
                    <div className="admin-form-group">
                      <label className="admin-checkbox-label">
                        <input
                          type="checkbox"
                          checked={formData.inStock}
                          onChange={(e) => handleChange('inStock', e.target.checked)}
                        />
                        In Stock
                      </label>
                    </div>
                  </div>
                </div>

                <div className="admin-form-actions">
                  <button type="button" className="admin-cancel-btn" onClick={closeModal}>
                    Cancel
                  </button>
                  <button type="submit" className="admin-primary-btn">
                    {editProduct ? 'Update Product' : 'Add Product'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
