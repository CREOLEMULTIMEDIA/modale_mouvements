import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Select } from '../components/Select';

describe('Select Component', () => {
  const options = [
    { label: 'Option 1', value: 'opt1' },
    { label: 'Option 2', value: 'opt2' }
  ];

  const groupedOptions = [
    {
      label: 'Group 1',
      options: [
        { label: 'Option 1.1', value: 'opt1.1' },
        { label: 'Option 1.2', value: 'opt1.2' }
      ]
    }
  ];

  it('renders simple options correctly', () => {
    render(<Select options={options} />);
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
  });

  it('renders grouped options correctly', () => {
    render(<Select options={groupedOptions} />);
    expect(screen.getByText('Group 1')).toBeInTheDocument();
    expect(screen.getByText('Option 1.1')).toBeInTheDocument();
    expect(screen.getByText('Option 1.2')).toBeInTheDocument();
  });

  it('shows error message when provided', () => {
    render(<Select options={options} error="Error message" />);
    expect(screen.getByText('Error message')).toBeInTheDocument();
  });

  it('handles selection correctly', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    
    render(<Select options={options} onChange={onChange} />);
    const select = screen.getByRole('combobox');
    
    await user.selectOptions(select, 'opt1');
    expect(onChange).toHaveBeenCalled();
    expect(select).toHaveValue('opt1');
  });

  it('disables options when isOptionDisabled is provided', () => {
    render(
      <Select 
        options={options} 
        isOptionDisabled={(option) => option.value === 'opt1'} 
      />
    );
    
    const option = screen.getByRole('option', { name: 'Option 1' });
    expect(option).toBeDisabled();
  });
});
