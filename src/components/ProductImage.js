import React from 'react';

function ProductImage({ product, size }) {
  const style = {
    background: `linear-gradient(135deg, ${product.colorFrom}, ${product.colorTo})`,
  };
  const className = size === 'large' ? 'product-image product-image--large' : 'product-image';

  return (
    <div className={className} style={style}>
      <span>{product.name.charAt(0)}</span>
    </div>
  );
}

export default ProductImage;