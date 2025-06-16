import React from 'react';

interface Option {
  value: string | number;
  label: string;
}

interface FormSelectProps<T> {
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
  placeholder?: string;
  className?: string;
  multiple?: boolean;
}

export function FormSelect<T extends Record<string, any>>({
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
  placeholder = 'Выберите значение',
  className = '',
  multiple = false
}: FormSelectProps<T>) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (multiple) {
      const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
      onChange(selectedOptions as T[keyof T]);
    } else {
      const newValue = e.target.value;
      onChange(newValue as T[keyof T]);
    }
  };

  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label
          htmlFor={String(name)}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <select
        id={String(name)}
        name={String(name)}
        value={value as string | number}
        onChange={handleChange}
        onBlur={onBlur}
        disabled={disabled}
        multiple={multiple}
        className={`
          w-full px-3 py-2 border rounded-md shadow-sm
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
          ${error && touched ? 'border-red-500' : 'border-gray-300'}
          ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}
        `}
      >
        {!multiple && <option value="">{placeholder}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && touched && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
} 