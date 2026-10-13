import React from 'react';
import { Link } from 'react-router-dom';
import ProductImage from './ProductImage';
import { formatPrice } from '../utils/formatPrice';
import { useCart } from '../context/CartContext';

function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <article className="card">
      <Link to={`/product/${product.id}`}>
        <ProductImage product={product} />
        <h3 className="card__name">{product.name}</h3>
      </Link>
      <p className="card__tagline">{product.tagline}</p>
      <div className="card__footer">
        <strong>{formatPrice(product.price)}</strong>
         <button className="btn" type="button" onClick={() => addToCart(product)}>
          Add to cart
        </button>
      </div>
    </article>
  );
}

export default ProductCard;