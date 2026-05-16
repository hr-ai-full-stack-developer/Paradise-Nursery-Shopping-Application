import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from '../redux/CartSlice';
import '../styles/CartItem.css';

/**
 * CartItem.jsx - Shopping Cart Page Component
 * Displays the shopping cart with all required functionalities:
 * - Display cart items with images, names, prices, and quantities
 * - Quantity increment/decrement controls
 * - Remove item functionality
 * - Cart subtotal calculation
 * - Discount code application
 * - Tax calculation (10%)
 * - Shipping options and costs
 * - Order summary with total
 * - Responsive design
 * - Empty cart message
 */

const CartItem = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const cartTotal = useSelector((state) => state.cart.totalPrice);

  // Local state
  const [discountCode, setDiscountCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [discountPercent, setDiscountPercent] = useState(0);
  const [shippingOption, setShippingOption] = useState('standard');
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');

  // Valid discount codes
  const validCoupons = {
    SAVE10: 10,
    SAVE20: 20,
    SPRING15: 15,
    WELCOME25: 25,
  };

  // Shipping costs
  const shippingCosts = {
    standard: 5.99,
    express: 12.99,
    overnight: 24.99,
  };

  // Calculate totals
  const subtotal = cartTotal;
  const discountAmount = (subtotal * discountPercent) / 100;
  const subtotalAfterDiscount = subtotal - discountAmount;
  const taxAmount = (subtotalAfterDiscount * 0.1).toFixed(2);
  const shippingCost = shippingCosts[shippingOption];
  const orderTotal = (parseFloat(subtotalAfterDiscount) + parseFloat(taxAmount) + shippingCost).toFixed(2);

  // Handle quantity change
  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity > 0) {
      dispatch(updateQuantity({ id: itemId, quantity: newQuantity }));
    }
  };

  // Handle remove item
  const handleRemoveItem = (itemId) => {
    dispatch(removeItem(itemId));
  };

  // Handle coupon application
  const handleApplyCoupon = () => {
    setCouponError('');
    setCouponSuccess('');

    if (!discountCode.trim()) {
      setCouponError('Please enter a coupon code');
      return;
    }

    const code = discountCode.toUpperCase();
    if (validCoupons[code]) {
      setDiscountPercent(validCoupons[code]);
      setDiscountApplied(true);
      setCouponSuccess(`Coupon applied! ${validCoupons[code]}% discount activated`);
      setDiscountCode('');
    } else {
      setCouponError('Invalid coupon code. Try: SAVE10, SAVE20, SPRING15, or WELCOME25');
    }
  };

  // Handle remove coupon
  const handleRemoveCoupon = () => {
    setDiscountPercent(0);
    setDiscountApplied(false);
    setDiscountCode('');
    setCouponError('');
    setCouponSuccess('');
  };

  // Handle checkout
  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    alert(`Order placed successfully! Total: $${orderTotal}\n\nThank you for shopping at Paradise Nursery!`);
  };

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h1>🛒 Shopping Cart</h1>
        <p>{cartItems.length} item(s) in your cart</p>
      </div>

      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <div className="empty-cart-icon">🛒</div>
          <h2>Your cart is empty</h2>
          <p>Start adding some beautiful plants to your cart!</p>
          <a href="/products" className="continue-shopping-btn">
            ← Continue Shopping
          </a>
        </div>
      ) : (
        <div className="cart-content">
          {/* Cart Items Section */}
          <div className="cart-items-section">
            <h2>Cart Items</h2>
            <div className="cart-items-list">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <div className="item-image">
                    <span className="emoji-image">{item.image}</span>
                  </div>

                  <div className="item-details">
                    <h3>{item.name}</h3>
                    <p className="item-category">{item.category}</p>
                    <p className="item-description">{item.description}</p>
                    <p className="item-price">Price: ${item.price.toFixed(2)}</p>
                  </div>

                  <div className="item-quantity">
                    <label>Quantity:</label>
                    <div className="quantity-control">
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        className="qty-btn"
                      >
                        −
                      </button>
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) =>
                          handleQuantityChange(item.id, parseInt(e.target.value) || 1)
                        }
                        className="qty-input"
                      />
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        className="qty-btn"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="item-total">
                    <p>Total</p>
                    <p className="total-price">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>

                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="remove-btn"
                    title="Remove item"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary Section */}
          <div className="order-summary">
            <h2>Order Summary</h2>

            {/* Coupon Section */}
            <div className="coupon-section">
              <h3>Apply Discount Code</h3>
              {discountApplied ? (
                <div className="coupon-applied">
                  <p className="success-message">✓ {couponSuccess}</p>
                  <button onClick={handleRemoveCoupon} className="remove-coupon-btn">
                    Remove Discount
                  </button>
                </div>
              ) : (
                <div className="coupon-input-group">
                  <input
                    type="text"
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value.toUpperCase())}
                    placeholder="Enter coupon code"
                    className="coupon-input"
                  />
                  <button onClick={handleApplyCoupon} className="apply-coupon-btn">
                    Apply
                  </button>
                  {couponError && <p className="error-message">{couponError}</p>}
                </div>
              )}
            </div>

            {/* Shipping Options */}
            <div className="shipping-section">
              <h3>Shipping Options</h3>
              <div className="shipping-options">
                {Object.entries(shippingCosts).map(([option, cost]) => (
                  <label key={option} className="shipping-option">
                    <input
                      type="radio"
                      name="shipping"
                      value={option}
                      checked={shippingOption === option}
                      onChange={(e) => setShippingOption(e.target.value)}
                    />
                    <span className="option-text">
                      {option.charAt(0).toUpperCase() + option.slice(1)} - ${cost.toFixed(2)}
                      {option === 'standard' && <span className="tag"> (5-7 days)</span>}
                      {option === 'express' && <span className="tag"> (2-3 days)</span>}
                      {option === 'overnight' && <span className="tag"> (Next day)</span>}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Summary Details */}
            <div className="summary-details">
              <div className="summary-row">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              {discountApplied && (
                <div className="summary-row discount">
                  <span>Discount ({discountPercent}%):</span>
                  <span className="discount-amount">
                    -${discountAmount.toFixed(2)}
                  </span>
                </div>
              )}

              <div className="summary-row">
                <span>Subtotal after discount:</span>
                <span>${subtotalAfterDiscount.toFixed(2)}</span>
              </div>

              <div className="summary-row">
                <span>Tax (10%):</span>
                <span>${taxAmount}</span>
              </div>

              <div className="summary-row">
                <span>Shipping ({shippingOption}):</span>
                <span>${shippingCost.toFixed(2)}</span>
              </div>

              <div className="summary-row total">
                <span>Order Total:</span>
                <span className="order-total">${orderTotal}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button onClick={handleCheckout} className="checkout-btn">
              Proceed to Checkout
            </button>

            {/* Continue Shopping Link */}
            <a href="/products" className="continue-shopping">
              ← Continue Shopping
            </a>
          </div>
        </div>
      )}

      {/* Cart Benefits */}
      <div className="cart-benefits">
        <div className="benefit">
          <span className="benefit-icon">🚚</span>
          <p>Free shipping on orders over $50</p>
        </div>
        <div className="benefit">
          <span className="benefit-icon">💚</span>
          <p>30-day plant health guarantee</p>
        </div>
        <div className="benefit">
          <span className="benefit-icon">📞</span>
          <p>24/7 customer support available</p>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
