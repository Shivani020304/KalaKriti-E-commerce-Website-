import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAdmin } from '../../context/AdminContext';
import { Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdminLogin() {
  const { login, isAuthenticated } = useAdmin();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // If already authenticated, redirect
  if (isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate a brief delay for UX
    setTimeout(() => {
      const success = login(password);
      if (success) {
        navigate('/admin', { replace: true });
      } else {
        setError('Invalid password. Please try again.');
        setPassword('');
      }
      setIsLoading(false);
    }, 600);
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-bg">
        <div className="admin-login-orb admin-login-orb-1" />
        <div className="admin-login-orb admin-login-orb-2" />
        <div className="admin-login-orb admin-login-orb-3" />
      </div>

      <motion.div
        className="admin-login-card"
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div className="admin-login-header">
          <div className="admin-login-icon">
            <Lock size={28} />
          </div>
          <h1 className="admin-login-title">KalaKriti Admin</h1>
          <p className="admin-login-desc">Enter your admin password to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="admin-login-form">
          <div className="admin-login-field">
            <label htmlFor="admin-password" className="admin-login-label">Password</label>
            <div className="admin-login-input-wrapper">
              <input
                id="admin-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="admin-login-input"
                autoFocus
                required
              />
              <button
                type="button"
                className="admin-login-toggle"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {error && (
            <motion.div
              className="admin-login-error"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <AlertCircle size={16} />
              <span>{error}</span>
            </motion.div>
          )}

          <button
            type="submit"
            className="admin-login-btn"
            disabled={isLoading || !password}
          >
            {isLoading ? (
              <span className="admin-login-spinner" />
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <p className="admin-login-hint">
          Demo password: <code>kalakriti2026</code>
        </p>
      </motion.div>
    </div>
  );
}
