import clsx from 'clsx';

export default function Badge({ children, variant = 'primary', className = '' }) {
  const variants = {
    primary: 'bg-primary text-white',
    accent: 'bg-accent text-white',
    success: 'bg-success text-white',
    error: 'bg-error text-white',
    new: 'bg-secondary text-white',
    sale: 'bg-error text-white',
  };

  return (
    <span className={clsx('inline-block px-3 py-1 text-xs font-semibold rounded-full uppercase tracking-wide', variants[variant], className)}>
      {children}
    </span>
  );
}
