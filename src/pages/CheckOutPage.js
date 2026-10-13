import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/formatPrice';

const TAX_RATE = 0.08; // pretend 8% tax

function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const [form, setForm] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zip: '',
    card: '',
  });
  const [order, setOrder] = useState(null);

  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;

  function handleChange(event) {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    setOrder({
      number: Math.floor(100000 + Math.random() * 900000),
      email: form.email,
      total: total,
    });
    clearCart();
  }

  if (order) {
    return (
      <div className="empty">
        <h1>Thank you! 🎉</h1>
        <p>
          Pretend order <strong>#{order.number}</strong> for {formatPrice(order.total)} is on its way.
          <br />
          A pretend confirmation was "sent" to {order.email}.
        </p>
        <Link to="/" className="btn">
          Back to the store
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="empty">
        <h1>Nothing to check out</h1>
        <p>Your cart is empty.</p>
        <Link to="/" className="btn">
          Browse products
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1>Checkout</h1>

      <div className="checkout">
        <form className="checkout__form" onSubmit={handleSubmit}>
          <h2>Shipping</h2>

          <label>
            Full name
            <input name="name" value={form.name} onChange={handleChange} required />
          </label>

          <label>
            Email
            <input type="email" name="email" value={form.email} onChange={handleChange} required />
          </label>

          <label>
            Address
            <input name="address" value={form.address} onChange={handleChange} required />
          </label>

          <div className="checkout__row">
            <label>
              City
              <input name="city" value={form.city} onChange={handleChange} required />
            </label>
            <label>
              ZIP code
              <input name="zip" value={form.zip} onChange={handleChange} required />
            </label>
          </div>

          <h2>Payment (demo only)</h2>
          <label>
            Fake card number
            <input
              name="card"
              value={form.card}
              onChange={handleChange}
              placeholder="0000 0000 0000 0000"
              required
            />
          </label>
          <p className="checkout__warning">
            This is a practice site. Do not enter a real card number. Type any made-up digits.
          </p>

          <button type="submit" className="btn">
            Place order
          </button>
        </form>

        <aside className="checkout__summary">
          <h2>Order summary</h2>
          {items.map(({ product, quantity }) => (
            <div className="summary-row" key={product.id}>
              <span>
                {product.name} × {quantity}
              </span>
              <span>{formatPrice(product.price * quantity)}</span>
            </div>
          ))}
          <hr />
          <div className="summary-row">
            <span>Subtotal</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className="summary-row">
            <span>Tax (8%)</span>
            <span>{formatPrice(tax)}</span>
          </div>
          <div className="summary-row summary-row--total">
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default CheckoutPage;