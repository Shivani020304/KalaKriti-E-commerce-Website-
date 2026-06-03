import { useAdmin } from '../../context/AdminContext';
import { formatPrice } from '../../utils/formatPrice';
import {
  TrendingUp,
  Package,
  ShoppingCart,
  IndianRupee,
  Clock,
  Loader2,
  ArrowUpRight,
} from 'lucide-react';
import { motion } from 'framer-motion';

const statusColors = {
  pending: { bg: '#FEF3C7', text: '#92400E', dot: '#F59E0B' },
  processing: { bg: '#DBEAFE', text: '#1E40AF', dot: '#3B82F6' },
  shipped: { bg: '#E0E7FF', text: '#3730A3', dot: '#6366F1' },
  delivered: { bg: '#D1FAE5', text: '#065F46', dot: '#10B981' },
};

export default function Dashboard() {
  const { orders, getAnalytics } = useAdmin();
  const analytics = getAnalytics();

  const statCards = [
    {
      label: 'Total Revenue',
      value: formatPrice(analytics.totalRevenue),
      icon: IndianRupee,
      color: '#2D6A4F',
      bgColor: '#D1FAE5',
    },
    {
      label: "This Month",
      value: formatPrice(analytics.monthRevenue),
      icon: TrendingUp,
      color: '#6366F1',
      bgColor: '#E0E7FF',
    },
    {
      label: 'Total Orders',
      value: analytics.totalOrders,
      icon: ShoppingCart,
      color: '#D97706',
      bgColor: '#FEF3C7',
    },
    {
      label: 'Total Products',
      value: analytics.totalProducts,
      icon: Package,
      color: '#DC2626',
      bgColor: '#FEE2E2',
    },
  ];

  // Revenue chart — bar chart using CSS
  const maxRevenue = Math.max(...analytics.last7Days.map((d) => d.revenue), 1);

  const recentOrders = orders.slice(0, 6);

  return (
    <div className="admin-dashboard">
      <div className="admin-page-header">
        <h1 className="admin-page-title">Dashboard</h1>
        <p className="admin-page-subtitle">Welcome back! Here's what's happening with your store.</p>
      </div>

      {/* Stat Cards */}
      <div className="admin-stats-grid">
        {statCards.map((card, i) => (
          <motion.div
            key={card.label}
            className="admin-stat-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="admin-stat-icon" style={{ backgroundColor: card.bgColor, color: card.color }}>
              <card.icon size={22} />
            </div>
            <div className="admin-stat-info">
              <p className="admin-stat-label">{card.label}</p>
              <p className="admin-stat-value">{card.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="admin-dashboard-grid">
        {/* Revenue Chart */}
        <motion.div
          className="admin-card admin-chart-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="admin-card-header">
            <h2 className="admin-card-title">Revenue — Last 7 Days</h2>
          </div>
          <div className="admin-chart">
            {analytics.last7Days.map((day, i) => (
              <div key={i} className="admin-chart-bar-group">
                <div className="admin-chart-bar-wrapper">
                  <div
                    className="admin-chart-bar"
                    style={{
                      height: `${Math.max((day.revenue / maxRevenue) * 100, 4)}%`,
                    }}
                  >
                    {day.revenue > 0 && (
                      <span className="admin-chart-bar-tooltip">
                        {formatPrice(day.revenue)}
                      </span>
                    )}
                  </div>
                </div>
                <span className="admin-chart-label">{day.label}</span>
                <span className="admin-chart-date">{day.date}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Pending / Processing */}
        <motion.div
          className="admin-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="admin-card-header">
            <h2 className="admin-card-title">Order Status</h2>
          </div>
          <div className="admin-order-status-summary">
            <div className="admin-status-item">
              <div className="admin-status-icon pending">
                <Clock size={20} />
              </div>
              <div>
                <p className="admin-status-count">{analytics.pendingOrders}</p>
                <p className="admin-status-label">Pending</p>
              </div>
            </div>
            <div className="admin-status-item">
              <div className="admin-status-icon processing">
                <Loader2 size={20} />
              </div>
              <div>
                <p className="admin-status-count">{analytics.processingOrders}</p>
                <p className="admin-status-label">Processing</p>
              </div>
            </div>
          </div>

          {/* Top Products */}
          <div className="admin-card-header" style={{ marginTop: '24px' }}>
            <h2 className="admin-card-title">Top Selling</h2>
          </div>
          <div className="admin-top-products">
            {analytics.topProducts.slice(0, 4).map((product, i) => (
              <div key={product.id} className="admin-top-product">
                <span className="admin-top-rank">#{i + 1}</span>
                <img src={product.image} alt={product.name} className="admin-top-product-img" />
                <div className="admin-top-product-info">
                  <p className="admin-top-product-name">{product.name}</p>
                  <p className="admin-top-product-stats">{product.quantity} sold · {formatPrice(product.revenue)}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Recent Orders */}
      <motion.div
        className="admin-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="admin-card-header">
          <h2 className="admin-card-title">Recent Orders</h2>
          <a href="/admin/orders" className="admin-card-link">
            View All <ArrowUpRight size={16} />
          </a>
        </div>
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Items</th>
                <th>Total</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => {
                const sc = statusColors[order.status] || statusColors.pending;
                return (
                  <tr key={order.id}>
                    <td className="admin-table-id">{order.id}</td>
                    <td>{order.customer.name}</td>
                    <td>{order.items.map((i) => i.name).join(', ')}</td>
                    <td className="admin-table-price">{formatPrice(order.total)}</td>
                    <td>
                      <span
                        className="admin-badge"
                        style={{ backgroundColor: sc.bg, color: sc.text }}
                      >
                        <span className="admin-badge-dot" style={{ backgroundColor: sc.dot }} />
                        {order.status}
                      </span>
                    </td>
                    <td className="admin-table-date">
                      {new Date(order.createdAt).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                      })}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
