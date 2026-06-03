import { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  Edit3,
  Trash2,
  X,
  FolderOpen,
  AlertTriangle,
  Check,
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function CategoryManagement() {
  const { categories, products, addCategory, updateCategory, deleteCategory } = useAdmin();
  const [newCategory, setNewCategory] = useState('');
  const [editingCategory, setEditingCategory] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const getProductCount = (categoryName) => {
    return products.filter((p) => p.category === categoryName).length;
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newCategory.trim()) return;

    const success = addCategory(newCategory.trim());
    if (success) {
      toast.success(`Category "${newCategory}" added`);
      setNewCategory('');
    } else {
      toast.error('Category already exists');
    }
  };

  const startEdit = (cat) => {
    setEditingCategory(cat);
    setEditValue(cat);
  };

  const handleUpdate = () => {
    if (!editValue.trim() || editValue.trim() === editingCategory) {
      setEditingCategory(null);
      return;
    }

    const success = updateCategory(editingCategory, editValue.trim());
    if (success) {
      toast.success('Category renamed');
    } else {
      toast.error('Category name already exists');
    }
    setEditingCategory(null);
  };

  const handleDelete = () => {
    const count = getProductCount(deleteConfirm);
    deleteCategory(deleteConfirm);
    toast.success(`Category deleted${count > 0 ? ` (${count} products are now uncategorized)` : ''}`);
    setDeleteConfirm(null);
  };

  return (
    <div className="admin-categories">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Categories</h1>
          <p className="admin-page-subtitle">Organize your product collection</p>
        </div>
      </div>

      {/* Add Category */}
      <div className="admin-card">
        <form onSubmit={handleAdd} className="admin-category-add-form">
          <div className="admin-form-group" style={{ flex: 1 }}>
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Enter new category name..."
              className="admin-input"
            />
          </div>
          <button type="submit" className="admin-primary-btn" disabled={!newCategory.trim()}>
            <Plus size={18} /> Add Category
          </button>
        </form>
      </div>

      {/* Category List */}
      <div className="admin-category-list">
        <AnimatePresence>
          {categories.map((cat) => {
            const count = getProductCount(cat);
            const isEditing = editingCategory === cat;

            return (
              <motion.div
                key={cat}
                className="admin-category-item"
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <div className="admin-category-icon">
                  <FolderOpen size={20} />
                </div>

                {isEditing ? (
                  <div className="admin-category-edit">
                    <input
                      type="text"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      className="admin-input"
                      autoFocus
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleUpdate();
                        if (e.key === 'Escape') setEditingCategory(null);
                      }}
                    />
                    <button className="admin-icon-btn success" onClick={handleUpdate}>
                      <Check size={16} />
                    </button>
                    <button className="admin-icon-btn" onClick={() => setEditingCategory(null)}>
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="admin-category-info">
                      <h3 className="admin-category-name">{cat}</h3>
                      <p className="admin-category-count">{count} product{count !== 1 ? 's' : ''}</p>
                    </div>
                    <div className="admin-category-actions">
                      <button
                        className="admin-icon-btn"
                        onClick={() => startEdit(cat)}
                        title="Rename"
                      >
                        <Edit3 size={16} />
                      </button>
                      <button
                        className="admin-icon-btn danger"
                        onClick={() => setDeleteConfirm(cat)}
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {categories.length === 0 && (
        <div className="admin-empty-state">
          <FolderOpen size={48} />
          <p>No categories yet. Add your first category above.</p>
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
              <h3 className="admin-confirm-title">Delete Category?</h3>
              <p className="admin-confirm-text">
                Delete "<strong>{deleteConfirm}</strong>"? 
                {getProductCount(deleteConfirm) > 0 && (
                  <> This category has <strong>{getProductCount(deleteConfirm)}</strong> products that will become uncategorized.</>
                )}
              </p>
              <div className="admin-confirm-actions">
                <button className="admin-cancel-btn" onClick={() => setDeleteConfirm(null)}>
                  Cancel
                </button>
                <button className="admin-danger-btn" onClick={handleDelete}>
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
