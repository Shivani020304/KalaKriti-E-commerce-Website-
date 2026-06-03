import clsx from 'clsx';

export default function Button({ children, variant = 'primary', size = 'md', className = '', disabled = false, onClick, type = 'button', ...props }) {
  const base = 'inline-flex items-center justify-center font-body font-semibold rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  const variants = {
    primary: 'bg-primary text-white hover:bg-[#245a42] focus:ring-primary shadow-md hover:shadow-lg',
    secondary: 'bg-white text-primary border-2 border-primary hover:bg-primary hover:text-white focus:ring-primary',
    accent: 'bg-accent text-white hover:bg-[#c4982e] focus:ring-accent shadow-md hover:shadow-lg',
    ghost: 'bg-transparent text-primary hover:bg-primary/10 focus:ring-primary',
    danger: 'bg-error text-white hover:bg-red-700 focus:ring-error',
  };
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <button
      type={type}
      className={clsx(base, variants[variant], sizes[size], className)}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}
