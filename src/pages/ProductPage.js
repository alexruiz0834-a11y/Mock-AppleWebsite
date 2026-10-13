import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import ProductImage from '../components/ProductImage';
import { fetchProductById } from '../api/productsApi';
import { formatPrice } from '../utils/formatPrice';

function ProductPage() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  // Load this product from the API whenever the id in the address changes.
  useEffect(() => {
    let ignore = false;

    setLoading(true);
    setError('');
    setProduct(null);
    setQuantity(1);
    setJustAdded(false);

    fetchProductById(id)
      .then((item) => {
        if (ignore) return;
        setProduct(item);
        setLoading(false);
      })
      .catch((err) => {
        if (ignore) return;
        setError(err.message);
        setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [id]);

  if (loading) {
    return <p className="status">Loading product…</p>;
  }

  if (error || !product) {
    return (
      <div className="empty">
        <h1>Product not found</h1>
        <p>We couldn't load this product. {error}</p>
        <Link to="/" className="btn">
          Back to the store
        </Link>
      </div>
    );
  }

  function handleAdd() {
    addToCart(product, quantity);
    setJustAdded(true);
  }

  return (
    <div>
      <Link to="/" className="back-link">
        ← Back to store
      </Link>

      <div className="detail">
        <ProductImage product={product} size="large" />

        <div className="detail__info">
          <p className="detail__category">{product.category}</p>
          <h1>{product.name}</h1>
          <p className="detail__price">{formatPrice(product.price)}</p>
          <p>{product.description}</p>

          <ul className="detail__specs">
            {product.specs.map((spec) => (
              <li key={spec}>{spec}</li>
            ))}
          </ul>

          <div className="detail__buy">
            <div className="qty">
              <button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                −
              </button>
              <span>{quantity}</span>
              <button type="button" onClick={() => setQuantity(quantity + 1)}>
                +
              </button>
            </div>
            <button type="button" className="btn" onClick={handleAdd}>
              Add to cart
            </button>
          </div>

          {justAdded && (
            <p className="detail__added">
              Added! <Link to="/cart">View cart →</Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductPage;