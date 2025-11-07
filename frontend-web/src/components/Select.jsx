const Select = ({ label, options, error, className = '', ...props }) => {
  return (
    <div className="w-full space-y-1.5 flex flex-col gap-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <select
        className={`w-full px-4 py-2.5 text-gray-900 bg-white
          border rounded-lg appearance-none transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-offset-0
          ${error 
            ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
            : 'border-gray-200 hover:border-gray-300 focus:border-primary-500 focus:ring-primary-200'
          }
          ${className}`}
        {...props}
      >
        <option value="">Select an option</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="text-sm text-red-500 animate-fade-in">{error}</p>
      )}
    </div>
  );
};

export default Select;