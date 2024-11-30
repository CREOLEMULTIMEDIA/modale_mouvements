import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MovementForm } from '../components/MovementForm';

describe('MovementForm Component', () => {
  const mockOnClose = vi.fn();
  const mockOnSubmit = vi.fn();

  beforeEach(() => {
    mockOnClose.mockClear();
    mockOnSubmit.mockClear();
  });

  it('renders all form fields correctly', () => {
    render(<MovementForm onClose={mockOnClose} onSubmit={mockOnSubmit} />);
    
    // Vérification des champs principaux
    expect(screen.getByLabelText(/nom/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/type de mouvement/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/montant/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/date d'effet/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/date bo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/frais/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/commentaire/i)).toBeInTheDocument();
  });

  it('shows validation errors for required fields', async () => {
    const user = userEvent.setup();
    render(<MovementForm onClose={mockOnClose} onSubmit={mockOnSubmit} />);
    
    // Tentative de soumission sans remplir les champs requis
    const submitButton = screen.getByText(/enregistrer/i);
    await user.click(submitButton);
    
    // Vérification des messages d'erreur
    await waitFor(() => {
      expect(screen.getByText(/le nom est requis/i)).toBeInTheDocument();
      expect(screen.getByText(/le type de mouvement est requis/i)).toBeInTheDocument();
    });
  });

  it('calculates fees correctly', async () => {
    const user = userEvent.setup();
    render(<MovementForm onClose={mockOnClose} onSubmit={mockOnSubmit} />);
    
    // Remplissage du montant et des frais
    const amountInput = screen.getByLabelText(/montant/i);
    const feesInput = screen.getByLabelText(/frais/i);
    
    await user.type(amountInput, '1000');
    await user.type(feesInput, '10');
    
    // Vérification des calculs
    expect(screen.getByText('900.00 €')).toBeInTheDocument(); // Montant net
    expect(screen.getByText('100.00 €')).toBeInTheDocument(); // Montant des frais
  });

  it('confirms before closing with unsaved changes', async () => {
    const user = userEvent.setup();
    window.confirm = vi.fn(() => true);
    
    render(<MovementForm onClose={mockOnClose} onSubmit={mockOnSubmit} />);
    
    // Modification d'un champ
    const nameInput = screen.getByLabelText(/nom/i);
    await user.type(nameInput, 'Test');
    
    // Tentative de fermeture
    const closeButton = screen.getByRole('button', { name: /close/i });
    await user.click(closeButton);
    
    expect(window.confirm).toHaveBeenCalled();
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('submits form with valid data', async () => {
    const user = userEvent.setup();
    render(<MovementForm onClose={mockOnClose} onSubmit={mockOnSubmit} />);
    
    // Remplissage des champs requis
    await user.type(screen.getByLabelText(/nom/i), 'Test Movement');
    await user.selectOptions(screen.getByLabelText(/type de mouvement/i), 'Arbitrage');
    await user.type(screen.getByLabelText(/montant/i), '1000');
    await user.type(screen.getByLabelText(/date d'effet/i), '2024-01-01');
    await user.type(screen.getByLabelText(/date bo/i), '2024-01-02');
    
    // Soumission du formulaire
    const submitButton = screen.getByText(/enregistrer/i);
    await user.click(submitButton);
    
    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          name: 'Test Movement',
          amount: 1000,
          effectiveDate: '2024-01-01',
          boDate: '2024-01-02'
        })
      );
    });
  });
});
