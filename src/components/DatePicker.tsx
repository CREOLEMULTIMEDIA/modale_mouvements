import React, { forwardRef } from 'react';

interface DatePickerProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  ({ className = '', error, ...props }, ref) => {
    return (
      <div>
        <input
          ref={ref}
          type="date"
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            error ? 'border-red-500' : 'border-gray-300'
          } ${className}`}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-red-500">{error}</p>
        )}
      </div>
    );
  }
);