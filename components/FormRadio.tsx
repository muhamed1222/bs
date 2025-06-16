import React from 'react';

interface Option {
  value: string | number;
  label: string;
  description?: string;
}

interface FormRadioProps<T> {
  name: keyof T;
  label?: string;
  options: Option[];
  value: T[keyof T];
  error?: string;
  touched?: boolean;
  onChange: (value: T[keyof T]) => void;
  onBlur?: () => void;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  inline?: boolean;
}

export function FormRadio<T extends Record<string, any>>({
  name,
  label,
  options,
  value,
  error,
  touched,
  onChange,
  onBlur,
  required = false,
  disabled = false,
  className = '',
  inline = false
}: FormRadioProps<T>) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value as T[keyof T]);
  };

  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className={`space-y-2 ${inline ? 'flex flex-wrap gap-4' : ''}`}>
        {options.map((option) => (
          <div key={option.value} className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id={`${String(name)}-${option.value}`}
                name={String(name)}
                type="radio"
                value={option.value}
                checked={value === option.value}
                onChange={handleChange}
                onBlur={onBlur}
                disabled={disabled}
                className={`
                  h-4 w-4
                  focus:ring-2 focus:ring-blue-500
                  ${error && touched ? 'border-red-500' : 'border-gray-300'}
                  ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}
                `}
              />
            </div>
            <div className="ml-3">
              <label
                htmlFor={`${String(name)}-${option.value}`}
                className="text-sm font-medium text-gray-700"
              >
                {option.label}
              </label>
              {option.description && (
                <p className="text-sm text-gray-500">{option.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>
      {error && touched && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
} 