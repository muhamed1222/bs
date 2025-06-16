import React from 'react';

interface FormTextareaProps<T> {
  name: keyof T;
  label?: string;
  value: T[keyof T];
  error?: string;
  touched?: boolean;
  onChange: (value: T[keyof T]) => void;
  onBlur?: () => void;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
  rows?: number;
  maxLength?: number;
  showCount?: boolean;
}

export function FormTextarea<T extends Record<string, any>>({
  name,
  label,
  value,
  error,
  touched,
  onChange,
  onBlur,
  required = false,
  disabled = false,
  placeholder,
  className = '',
  rows = 4,
  maxLength,
  showCount = false
}: FormTextareaProps<T>) {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value as T[keyof T]);
  };

  const currentLength = String(value).length;

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
      <div className="relative">
        <textarea
          id={String(name)}
          name={String(name)}
          value={value as string}
          onChange={handleChange}
          onBlur={onBlur}
          placeholder={placeholder}
          disabled={disabled}
          rows={rows}
          maxLength={maxLength}
          className={`
            w-full px-3 py-2 border rounded-md shadow-sm
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
            ${error && touched ? 'border-red-500' : 'border-gray-300'}
            ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}
            resize-y
          `}
        />
        {showCount && maxLength && (
          <div className="absolute bottom-2 right-2 text-sm text-gray-500">
            {currentLength}/{maxLength}
          </div>
        )}
      </div>
      {error && touched && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
} 