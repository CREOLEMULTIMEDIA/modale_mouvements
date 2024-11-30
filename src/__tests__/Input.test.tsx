import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from '../components/Input';

describe('Input Component', () => {
  it('renders correctly', () => {
    render(<Input placeholder="Test input" />);
    expect(screen.getByPlaceholderText('Test input')).toBeInTheDocument();
  });

  it('shows error message when provided', () => {
    render(<Input error="Error message" />);
    expect(screen.getByText('Error message')).toBeInTheDocument();
  });

  it('shows suffix when provided', () => {
    render(<Input suffix="%" />);
    expect(screen.getByText('%')).toBeInTheDocument();
  });

  it('handles user input correctly', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    
    render(<Input onChange={onChange} />);
    const input = screen.getByRole('textbox');
    
    await user.type(input, 'test');
    expect(onChange).toHaveBeenCalled();
    expect(input).toHaveValue('test');
  });

  it('applies error styles when error is present', () => {
    render(<Input error="Error" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('border-red-500');
  });
});
