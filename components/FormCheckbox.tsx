import React from 'react';

interface FormCheckboxProps<T> {
  name: keyof T;
  label?: string;
  value: boolean;
  error?: string;
  touched?: boolean;
  onChange: (value: boolean) => void;
  onBlur?: () => void;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  description?: string;
}

export function FormCheckbox<T extends Record<string, any>>({
  name,
  label,
  value,
  error,
  touched,
  onChange,
  onBlur,
  required = false,
  disabled = false,
  className = '',
  description
}: FormCheckboxProps<T>) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.checked);
  };

  return (
    <div className={`mb-4 ${className}`}>
      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            id={String(name)}
            name={String(name)}
            type="checkbox"
            checked={value}
            onChange={handleChange}
            onBlur={onBlur}
            disabled={disabled}
            className={`
              h-4 w-4 rounded
              focus:ring-2 focus:ring-blue-500
              ${error && touched ? 'border-red-500' : 'border-gray-300'}
              ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}
            `}
          />
        </div>
        <div className="ml-3">
          {label && (
            <label
              htmlFor={String(name)}
              className="text-sm font-medium text-gray-700"
            >
              {label}
              {required && <span className="text-red-500 ml-1">*</span>}
            </label>
          )}
          {description && (
            <p className="text-sm text-gray-500">{description}</p>
          )}
          {error && touched && (
            <p className="mt-1 text-sm text-red-600">{error}</p>
          )}
        </div>
      </div>
    </div>
  );
} 