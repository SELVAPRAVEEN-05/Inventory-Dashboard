const Button = ({ children, variant = 'primary', size = 'md', className = '', disabled, loading, ...props }) => {
  const variants = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700 shadow-sm hover:shadow-md',
    secondary: 'bg-gray-100 text-gray-800 hover:bg-gray-200 border border-gray-200',
    danger: 'bg-red-500 text-white hover:bg-red-600 shadow-sm hover:shadow-md',
    outline: 'border-2 border-primary-600 text-primary-600 hover:bg-primary-50'
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base'
  };

  return (
    <button
      className={`rounded-lg cursor-pointer font-medium transition-all duration-200 ease-in-out
        transform hover:-translate-y-0.5 active:translate-y-0
        ${variants[variant]} ${sizes[size]} 
        ${loading ? 'opacity-70 cursor-not-allowed translate-y-0' : ''} 
        ${disabled ? 'opacity-50 cursor-not-allowed translate-y-0 hover:shadow-none' : ''} 
        ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <div className="flex items-center justify-center">
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2 opacity-70"></div>
          Loading...
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;