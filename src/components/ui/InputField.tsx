import React from 'react';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  icon?: React.ReactNode;
  error?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  icon,
  error,
  className = '',
  ...props
}) => {
  return (
    <div className="space-y-1">
      <label 
        htmlFor={id} 
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
            {icon}
          </div>
        )}
        <input
          id={id}
          className={`
            w-full px-3 py-2 rounded-md border focus:outline-none
            placeholder-gray-400 transition-colors duration-200
            ${icon ? 'pl-10' : ''}
            ${error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 
              'border-gray-300 focus:ring-sky-500 focus:border-sky-500'}
            ${className}
          `}
          aria-invalid={error ? 'true' : 'false'}
          {...props}
        />
      </div>
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default InputField;