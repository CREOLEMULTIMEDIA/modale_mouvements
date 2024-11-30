import '@testing-library/jest-dom';
import { vi } from 'vitest';
import { cleanup } from '@testing-library/react';

// Nettoyage automatique après chaque test
afterEach(() => {
  cleanup();
});

// Mock de window.confirm
const mockConfirm = vi.fn(() => true);
window.confirm = mockConfirm;

// Mock des transitions pour @headlessui/react
vi.mock('@headlessui/react', () => ({
  Transition: {
    Child: ({ children }: { children: React.ReactNode }) => children,
    Root: ({ children }: { children: React.ReactNode }) => children,
  },
  Dialog: {
    Panel: ({ children }: { children: React.ReactNode }) => children,
    Title: ({ children }: { children: React.ReactNode }) => children,
    Description: ({ children }: { children: React.ReactNode }) => children,
  },
}));
