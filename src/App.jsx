import { useState, useEffect } from 'react';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import './App.css';

function App() {
  const [cart, setCart] = useState([]);
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  // Load cart from localStorage when component mounts
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    const savedCoupon = localStorage.getItem('coupon');
    
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
    
    if (savedCoupon) {
      setAppliedCoupon(savedCoupon);
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Save coupon to localStorage whenever it changes
  useEffect(() => {
    if (appliedCoupon) {
      localStorage.setItem('coupon', appliedCoupon);
    } else {
      localStorage.removeItem('coupon');
    }
  }, [appliedCoupon]);

  const addToCart = (product) => {
    setCart(prevCart => {
      // Check if product is already in cart
      const existingItemIndex = prevCart.findIndex(item => item.product.id === product.id);
      
      if (existingItemIndex >= 0) {
        // Product exists in cart, update quantity
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += 1;
        return updatedCart;
      } else {
        // Product not in cart, add new item
        return [...prevCart, { product, quantity: 1 }];
      }
    });
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    
    setCart(prevCart => {
      return prevCart.map(item => {
        if (item.product.id === productId) {
          return { ...item, quantity: newQuantity };
        }
        return item;
      });
    });
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.product.id !== productId));
  };

  const applyCoupon = (coupon) => {
    setAppliedCoupon(coupon);
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  return (
    <div className="app">
      <header>
        <h1>Shopping Cart App</h1>
      </header>
      
      <main>
        <div className="container">
          <ProductList addToCart={addToCart} />
          
          <Cart 
            cart={cart} 
            updateQuantity={updateQuantity} 
            removeFromCart={removeFromCart}
            appliedCoupon={appliedCoupon}
            applyCoupon={applyCoupon}
            removeCoupon={removeCoupon}
          />
        </div>
      </main>
      
      <footer>
        <p>&copy; 2025 Shopping Cart App</p>
      </footer>
    </div>
  );
}

export default App;