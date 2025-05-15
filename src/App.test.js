import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

// Mock localStorage
const localStorageMock = (function() {
  let store = {};
  return {
    getItem: function(key) {
      return store[key] || null;
    },
    setItem: function(key, value) {
      store[key] = value.toString();
    },
    removeItem: function(key) {
      delete store[key];
    },
    clear: function() {
      store = {};
    }
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

describe('Shopping Cart App', () => {
  beforeEach(() => {
    window.localStorage.clear();
    vi.spyOn(window.localStorage, 'setItem');
    vi.spyOn(window.localStorage, 'getItem');
  });

  it('renders the shopping cart app with products', () => {
    render(<App />);
    expect(screen.getByText('Shopping Cart App')).toBeInTheDocument();
    expect(screen.getByText('Products')).toBeInTheDocument();
    expect(screen.getByText('Your Shopping Cart')).toBeInTheDocument();
  });

  it('adds a product to the cart when "Add to Cart" is clicked', () => {
    render(<App />);
    const addButtons = screen.getAllByText('Add to Cart');
    fireEvent.click(addButtons[0]); // Add the first product
    
    // Check if the product is in the cart
    expect(localStorage.setItem).toHaveBeenCalled();
    expect(screen.queryByText('Your cart is empty')).not.toBeInTheDocument();
  });

  it('updates quantity when + button is clicked', () => {
    render(<App />);
    const addButtons = screen.getAllByText('Add to Cart');
    fireEvent.click(addButtons[0]); // Add a product
    
    // Find + button and click it
    const plusButton = screen.getByText('+');
    fireEvent.click(plusButton);
    
    // Get the quantity input
    const quantityInput = screen.getByRole('spinbutton');
    expect(quantityInput.value).toBe('2');
  });

  it('removes product when Remove button is clicked', () => {
    render(<App />);
    const addButtons = screen.getAllByText('Add to Cart');
    fireEvent.click(addButtons[0]); // Add a product
    
    // Find and click Remove button
    const removeButton = screen.getByText('Remove');
    fireEvent.click(removeButton);
    
    // Check if cart is empty
    expect(screen.getByText('Your cart is empty')).toBeInTheDocument();
  });

  it('applies a valid coupon code', () => {
    render(<App />);
    const addButtons = screen.getAllByText('Add to Cart');
    fireEvent.click(addButtons[0]); // Add a product
    
    // Enter and apply coupon
    const couponInput = screen.getByPlaceholderText('Enter coupon code');
    fireEvent.change(couponInput, { target: { value: 'WEB3BRIDGECOHORTx' } });
    
    const applyButton = screen.getByText('Apply');
    fireEvent.click(applyButton);
    
    // Check if coupon is applied
    expect(screen.getByText('Coupon applied: 10% off')).toBeInTheDocument();
  });
});