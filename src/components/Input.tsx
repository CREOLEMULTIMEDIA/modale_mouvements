import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  suffix?: string;
}

export function Input({ suffix, className = '', ...props }: InputProps) {
  return (
    <div className="relative">
      <input
        {...props}
        className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
          suffix ? 'pr-8' : ''
        } ${className}`}
      />
      {suffix && (
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
          {suffix}
        </span>
      )}
    </div>
  );
}