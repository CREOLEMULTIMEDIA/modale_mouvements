import React from 'react';

interface Option {
  label: string;
  value?: string;
  options?: Option[];
}

interface SelectProps {
  options: Option[];
  value?: string;
  onChange?: (value: string) => void;
  isOptionDisabled?: (option: Option) => boolean;
}

export function Select({ options, value, onChange, isOptionDisabled }: SelectProps) {
  const renderOptions = (options: Option[]) => {
    return options.map((option) => {
      if (option.options) {
        return (
          <optgroup key={option.label} label={option.label}>
            {renderOptions(option.options)}
          </optgroup>
        );
      }
      return (
        <option 
          key={option.value} 
          value={option.value}
          disabled={isOptionDisabled ? isOptionDisabled(option) : false}
        >
          {option.label}
        </option>
      );
    });
  };

  return (
    <select
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
    >
      <option value="">Sélectionner</option>
      {renderOptions(options)}
    </select>
  );
}