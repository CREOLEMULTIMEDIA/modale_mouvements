import React, { forwardRef } from 'react';

interface Option {
  label: string;
  value: string;
}

interface OptionGroup {
  label: string;
  options: Option[];
}

interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'options'> {
  options: (Option | OptionGroup)[];
  isOptionDisabled?: (option: Option) => boolean;
  error?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ options, isOptionDisabled, className = '', error, ...props }, ref) => {
    return (
      <div>
        <select
          ref={ref}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            error ? 'border-red-500' : 'border-gray-300'
          } ${className}`}
          {...props}
        >
          <option value="">Sélectionner...</option>
          {options.map((item, index) => {
            if ('options' in item) {
              return (
                <optgroup key={index} label={item.label}>
                  {item.options.map((option, optionIndex) => (
                    <option
                      key={`${index}-${optionIndex}`}
                      value={option.value}
                      disabled={isOptionDisabled?.(option)}
                    >
                      {option.label}
                    </option>
                  ))}
                </optgroup>
              );
            } else {
              return (
                <option
                  key={index}
                  value={item.value}
                  disabled={isOptionDisabled?.(item)}
                >
                  {item.label}
                </option>
              );
            }
          })}
        </select>
        {error && (
          <p className="mt-1 text-sm text-red-500">{error}</p>
        )}
      </div>
    );
  }
);