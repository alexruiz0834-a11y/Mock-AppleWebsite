import React, { useState } from 'react';
import products from '../data/products';
import ProductCard from '../components/ProductCard';

function Home() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...new Set(products.map((p) => p.category))];

  const visibleProducts =
    selectedCategory === 'All'
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <div>
      <section className="hero">
        <h1>Meet the Nimbus lineup.</h1>
        <p>A pretend store with pretend gadgets, built to learn React.</p>
      </section>

      <div className="filters">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            className={category === selectedCategory ? 'chip chip--active' : 'chip'}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid">
        {visibleProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Home;