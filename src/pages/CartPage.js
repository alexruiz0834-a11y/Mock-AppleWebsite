import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import ProductImage from '../components/ProductImage';
import { formatPrice } from '../utils/formatPrice';

function CartPage() {
  const { items, setQuantity, removeFromCart, subtotal } = useCart();

  if (items.length === 0) {
    return (
      <div className="empty">
        <h1>Your cart is empty</h1>
        <p>Add a pretend gadget or two.</p>
        <Link to="/" className="btn">
          Browse products
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1>Your cart</h1>

      <div className="cart-list">
        {items.map(({ product, quantity }) => (
          <div className="cart-row" key={product.id}>
            <div className="cart-row__image">
              <ProductImage product={product} />
            </div>

            <div className="cart-row__info">
              <Link to={`/product/${product.id}`}>
                <strong>{product.name}</strong>
              </Link>
              <div>{formatPrice(product.price)}</div>
              <button
                type="button"
                className="link-button"
                onClick={() => removeFromCart(product.id)}
              >
                Remove
              </button>
            </div>

            <div className="qty">
              <button type="button" onClick={() => setQuantity(product.id, quantity - 1)}>
                −
              </button>
              <span>{quantity}</span>
              <button type="button" onClick={() => setQuantity(product.id, quantity + 1)}>
                +
              </button>
            </div>

            <div className="cart-row__total">{formatPrice(product.price * quantity)}</div>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <div>
          Subtotal: <strong>{formatPrice(subtotal)}</strong>
        </div>
        <Link to="/checkout" className="btn">
          Go to checkout
        </Link>
      </div>
    </div>
  );
}

export default CartPage;