import { describe, it, expect, beforeEach, vi } from 'vitest';

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

// Helper function to simulate cart operations
function CartManager() {
  // Add product to cart
  function addToCart(product) {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItemIndex = cart.findIndex(item => item.product.id === product.id);
    
    if (existingItemIndex >= 0) {
      cart[existingItemIndex].quantity += 1;
    } else {
      cart.push({ product, quantity: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    return cart;
  }
  
  // Update quantity of a product in cart
  function updateQuantity(productId, newQuantity) {
    if (newQuantity < 1) return null;
    
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const updatedCart = cart.map(item => {
      if (item.product.id === productId) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    return updatedCart;
  }
  
  // Remove product from cart
  function removeFromCart(productId) {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const updatedCart = cart.filter(item => item.product.id !== productId);
    
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    return updatedCart;
  }
  
  // Apply coupon
  function applyCoupon(coupon) {
    if (coupon === 'WEB3BRIDGECOHORTx') {
      localStorage.setItem('coupon', coupon);
      return true;
    }
    return false;
  }
  
  // Get total price with coupon (if applied)
  function getTotalPrice() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const coupon = localStorage.getItem('coupon');
    
    const subtotal = cart.reduce((total, item) => {
      return total + (item.product.price * item.quantity);
    }, 0);
    
    if (coupon === 'WEB3BRIDGECOHORTx') {
      return subtotal * 0.9; // 10% discount
    }
    
    return subtotal;
  }
  
  return {
    addToCart,
    updateQuantity,
    removeFromCart,
    applyCoupon,
    getTotalPrice
  };
}

describe('Shopping Cart Functionality Tests', () => {
  let cartManager;
  let testProduct;
  
  beforeEach(() => {
    window.localStorage.clear();
    vi.spyOn(window.localStorage, 'setItem');
    vi.spyOn(window.localStorage, 'getItem');
    
    cartManager = CartManager();
    testProduct = {
      id: 1,
      name: "Test Product",
      price: 100,
      image: "/test.jpg",
      description: "Test product description"
    };
  });

  it('adds a product to the cart', () => {
    const updatedCart = cartManager.addToCart(testProduct);
    expect(updatedCart.length).toBe(1);
    expect(updatedCart[0].product.id).toBe(1);
    expect(updatedCart[0].quantity).toBe(1);
    expect(localStorage.setItem).toHaveBeenCalled();
  });

  it('increases quantity when adding the same product', () => {
    cartManager.addToCart(testProduct);
    const updatedCart = cartManager.addToCart(testProduct);
    expect(updatedCart.length).toBe(1);
    expect(updatedCart[0].quantity).toBe(2);
  });

  it('updates quantity of a product in cart', () => {
    cartManager.addToCart(testProduct);
    const updatedCart = cartManager.updateQuantity(1, 5);
    expect(updatedCart[0].quantity).toBe(5);
  });

  it('does not update quantity if below 1', () => {
    cartManager.addToCart(testProduct);
    const result = cartManager.updateQuantity(1, 0);
    expect(result).toBeNull();
  });

  it('removes a product from the cart', () => {
    cartManager.addToCart(testProduct);
    const updatedCart = cartManager.removeFromCart(1);
    expect(updatedCart.length).toBe(0);
  });

  it('applies a valid coupon code', () => {
    const result = cartManager.applyCoupon('WEB3BRIDGECOHORTx');
    expect(result).toBe(true);
    expect(localStorage.getItem('coupon')).toBe('WEB3BRIDGECOHORTx');
  });

  it('rejects an invalid coupon code', () => {
    const result = cartManager.applyCoupon('INVALID');
    expect(result).toBe(false);
    expect(localStorage.getItem('coupon')).toBeNull();
  });

  it('calculates total price correctly without coupon', () => {
    cartManager.addToCart(testProduct);
    cartManager.updateQuantity(1, 3); // 3 x $100
    const total = cartManager.getTotalPrice();
    expect(total).toBe(300);
  });

  it('calculates total price correctly with coupon (10% discount)', () => {
    cartManager.addToCart(testProduct);
    cartManager.updateQuantity(1, 3); // 3 x $100 = $300
    cartManager.applyCoupon('WEB3BRIDGECOHORTx');
    const total = cartManager.getTotalPrice();
    expect(total).toBe(270); // $300 - 10% = $270
  });
});