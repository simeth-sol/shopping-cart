import React, { useState } from 'react';

const Cart = ({ 
  cart, 
  updateQuantity, 
  removeFromCart, 
  appliedCoupon, 
  applyCoupon,
  removeCoupon
}) => {
  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');

  const handleCouponSubmit = (e) => {
    e.preventDefault();
    
    // Validation using regex (alphanumeric check)
    const couponRegex = /^[A-Za-z0-9]+$/;
    
    if (!couponRegex.test(couponCode)) {
      setCouponError('Invalid coupon code format');
      return;
    }
    
    if (couponCode === 'WEB3BRIDGECOHORTx') {
      applyCoupon(couponCode);
      setCouponError('');
    } else {
      setCouponError('Invalid coupon code');
    }
  };

  const getTotalPrice = () => {
    const subtotal = cart.reduce((total, item) => {
      return total + (item.product.price * item.quantity);
    }, 0);
    
    if (appliedCoupon) {
      // 10% discount
      return subtotal * 0.9;
    }
    
    return subtotal;
  };

  return (
    <div className="cart">
      <h2>Your Shopping Cart</h2>
      
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <div className="cart-items">
            {cart.map(item => (
              <div key={item.product.id} className="cart-item">
                <img 
                  src={item.product.image} 
                  alt={item.product.name} 
                  className="cart-item-image"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/50";
                  }}
                />
                <div className="cart-item-details">
                  <h4>{item.product.name}</h4>
                  <p>${item.product.price.toFixed(2)}</p>
                </div>
                <div className="cart-item-actions">
                  <button 
                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <input 
                    type="number" 
                    min="1" 
                    value={item.quantity} 
                    onChange={(e) => {
                      const newQuantity = parseInt(e.target.value);
                      if (!isNaN(newQuantity) && newQuantity > 0) {
                        updateQuantity(item.product.id, newQuantity);
                      }
                    }} 
                  />
                  <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)}>
                    +
                  </button>
                  <button 
                    className="remove-btn"
                    onClick={() => removeFromCart(item.product.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="cart-summary">
            <div className="coupon-form">
              <form onSubmit={handleCouponSubmit}>
                <input 
                  type="text" 
                  placeholder="Enter coupon code" 
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                />
                <button type="submit">Apply</button>
              </form>
              {couponError && <p className="error">{couponError}</p>}
              {appliedCoupon && (
                <div className="applied-coupon">
                  <p>Coupon applied: 10% off</p>
                  <button onClick={removeCoupon}>Remove</button>
                </div>
              )}
            </div>
            
            <div className="cart-total">
              <p>Subtotal: ${cart.reduce((total, item) => total + (item.product.price * item.quantity), 0).toFixed(2)}</p>
              {appliedCoupon && (
                <p>Discount: -${(cart.reduce((total, item) => total + (item.product.price * item.quantity), 0) * 0.1).toFixed(2)}</p>
              )}
              <h3>Total: ${getTotalPrice().toFixed(2)}</h3>
            </div>
            
            <button className="checkout-btn">Proceed to Checkout</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;