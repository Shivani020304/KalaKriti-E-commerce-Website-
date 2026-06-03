import { useState, useMemo } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { formatPrice } from '../../utils/formatPrice';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Filter,
  ChevronDown,
  Eye,
  X,
  MapPin,
  Phone,
  Mail,
  Package,
} from 'lucide-react';
import toast from 'react-hot-toast';

const STATUS_OPTIONS = ['pending', 'processing', 'shipped', 'delivered'];

const statusColors = {
  pending: { bg: '#FEF3C7', text: '#92400E', dot: '#F59E0B' },
  processing: { bg: '#DBEAFE', text: '#1E40AF', dot: '#3B82F6' },
  shipped: { bg: '#E0E7FF', text: '#3730A3', dot: '#6366F1' },
  delivered: { bg: '#D1FAE5', text: '#065F46', dot: '#10B981' },
};

export default function OrderManagement() {
  const { orders, updateOrderStatus } = useAdmin();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchSearch =
        order.id.toLowerCase().includes(search.toLowerCase()) ||
        order.customer.name.toLowerCase().includes(search.toLowerCase()) ||
        order.customer.phone.includes(search);
      const matchStatus = statusFilter === 'all' || order.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [orders, search, statusFilter]);

  const handleStatusChange = (orderId, newStatus) => {
    updateOrderStatus(orderId, newStatus);
    toast.success(`Order status updated to ${newStatus}`);
    if (selectedOrder?.id === orderId) {
      setSelectedOrder((prev) => ({ ...prev, status: newStatus }));
    }
  };

  return (
    <div className="admin-orders">
      <div className="admin-page-header">
        <h1 className="admin-page-title">Orders</h1>
        <p className="admin-page-subtitle">Manage and track all customer orders</p>
      </div>

      {/* Filters */}
      <div className="admin-toolbar">
        <div className="admin-search">
          <Search size={18} className="admin-search-icon" />
          <input
            type="text"
            placeholder="Search by Order ID, customer name, or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="admin-search-input"
          />
        </div>
        <div className="admin-filter-group">
          <Filter size={16} />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="admin-select"
          >
            <option value="all">All Status</option>
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Count */}
      <p className="admin-result-count">
        Showing {filteredOrders.length} of {orders.length} orders
      </p>

      {/* Orders Table */}
      <div className="admin-card">
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Items</th>
                <th>Total</th>
                <th>Payment</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={8} className="admin-table-empty">
                    No orders found
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => {
                  const sc = statusColors[order.status] || statusColors.pending;
                  return (
                    <tr key={order.id}>
                      <td className="admin-table-id">{order.id}</td>
                      <td>
                        <div>
                          <p className="admin-table-name">{order.customer.name}</p>
                          <p className="admin-table-sub">{order.customer.phone}</p>
                        </div>
                      </td>
                      <td>
                        <div className="admin-order-items-cell">
                          {order.items.map((item, i) => (
                            <span key={i} className="admin-item-chip">
                              {item.name} ×{item.quantity}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="admin-table-price">{formatPrice(order.total)}</td>
                      <td>
                        <span className={`admin-payment-badge ${order.paymentMethod}`}>
                          {order.paymentMethod === 'online' ? 'Razorpay' : 'WhatsApp'}
                        </span>
                      </td>
                      <td>
                        <div className="admin-status-select-wrapper">
                          <select
                            value={order.status}
                            onChange={(e) => handleStatusChange(order.id, e.target.value)}
                            className="admin-status-select"
                            style={{
                              backgroundColor: sc.bg,
                              color: sc.text,
                            }}
                          >
                            {STATUS_OPTIONS.map((s) => (
                              <option key={s} value={s}>
                                {s.charAt(0).toUpperCase() + s.slice(1)}
                              </option>
                            ))}
                          </select>
                          <ChevronDown size={14} className="admin-status-chevron" style={{ color: sc.text }} />
                        </div>
                      </td>
                      <td className="admin-table-date">
                        {new Date(order.createdAt).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </td>
                      <td>
                        <button
                          className="admin-action-btn"
                          onClick={() => setSelectedOrder(order)}
                          title="View Details"
                        >
                          <Eye size={18} />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Detail Modal */}
      <AnimatePresence>
        {selectedOrder && (
          <motion.div
            className="admin-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedOrder(null)}
          >
            <motion.div
              className="admin-modal"
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="admin-modal-header">
                <h2 className="admin-modal-title">
                  <Package size={20} />
                  Order {selectedOrder.id}
                </h2>
                <button
                  className="admin-modal-close"
                  onClick={() => setSelectedOrder(null)}
                >
                  <X size={20} />
                </button>
              </div>

              <div className="admin-modal-body">
                {/* Customer Info */}
                <div className="admin-detail-section">
                  <h3 className="admin-detail-heading">Customer Details</h3>
                  <div className="admin-detail-grid">
                    <div className="admin-detail-item">
                      <Mail size={16} />
                      <span>{selectedOrder.customer.email}</span>
                    </div>
                    <div className="admin-detail-item">
                      <Phone size={16} />
                      <span>{selectedOrder.customer.phone}</span>
                    </div>
                    <div className="admin-detail-item full-width">
                      <MapPin size={16} />
                      <span>
                        {selectedOrder.customer.address}, {selectedOrder.customer.city},{' '}
                        {selectedOrder.customer.state} - {selectedOrder.customer.pincode}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Items */}
                <div className="admin-detail-section">
                  <h3 className="admin-detail-heading">Order Items</h3>
                  <div className="admin-order-items-list">
                    {selectedOrder.items.map((item, i) => (
                      <div key={i} className="admin-order-item">
                        <img src={item.image} alt={item.name} className="admin-order-item-img" />
                        <div className="admin-order-item-info">
                          <p className="admin-order-item-name">{item.name}</p>
                          <p className="admin-order-item-meta">
                            Size: {item.size} · Qty: {item.quantity}
                          </p>
                        </div>
                        <p className="admin-order-item-price">{formatPrice(item.price * item.quantity)}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Summary */}
                <div className="admin-detail-section">
                  <h3 className="admin-detail-heading">Payment Summary</h3>
                  <div className="admin-summary-rows">
                    <div className="admin-summary-row">
                      <span>Subtotal</span>
                      <span>{formatPrice(selectedOrder.subtotal)}</span>
                    </div>
                    <div className="admin-summary-row">
                      <span>Shipping</span>
                      <span>{selectedOrder.shipping === 0 ? 'Free' : formatPrice(selectedOrder.shipping)}</span>
                    </div>
                    <div className="admin-summary-row total">
                      <span>Total</span>
                      <span>{formatPrice(selectedOrder.total)}</span>
                    </div>
                  </div>
                  {selectedOrder.paymentId && (
                    <p className="admin-payment-id">Payment ID: {selectedOrder.paymentId}</p>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
