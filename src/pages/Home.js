import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import { fetchProducts } from '../api/productsApi';

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchInput, setSearchInput] = useState(''); // what is typed in the box
  const [searchTerm, setSearchTerm] = useState(''); // what we actually search for
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [reloadKey, setReloadKey] = useState(0); // lets "Try again" reload

  // 1) Wait until the user stops typing for 0.4 seconds, then save the term.
  useEffect(() => {
    const timer = setTimeout(() => setSearchTerm(searchInput.trim()), 400);
    return () => clearTimeout(timer); // cancel the timer if they type again
  }, [searchInput]);

  // 2) Whenever the search term changes, call the API.
  useEffect(() => {
    let ignore = false; // protects against slow, out-of-date responses

    setLoading(true);
    setError('');

    fetchProducts(searchTerm)
      .then((items) => {
        if (ignore) return;
        setProducts(items);
        setSelectedCategory('All');
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
  }, [searchTerm, reloadKey]);

  function handleSubmit(event) {
    event.preventDefault();
    setSearchTerm(searchInput.trim()); // search right away on Enter / button
  }

  function clearSearch() {
    setSearchInput('');
    setSearchTerm('');
  }

  const categories = ['All', ...new Set(products.map((p) => p.category))];

  const visibleProducts =
    selectedCategory === 'All'
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <div>
      <section className="hero">
        <h1>Meet the Nimbus lineup.</h1>
        <p>A pretend store with products loaded from a real API, built to learn React.</p>
      </section>

      <form className="search" onSubmit={handleSubmit} role="search">
        <input
          type="search"
          className="search__input"
          placeholder="Search products (try “phone” or “watch”)"
          aria-label="Search products"
          value={searchInput}
          onChange={(event) => setSearchInput(event.target.value)}
        />
        <button type="submit" className="btn">
          Search
        </button>
        {searchInput && (
          <button type="button" className="btn btn--secondary" onClick={clearSearch}>
            Clear
          </button>
        )}
      </form>

      {loading && <p className="status">Loading products…</p>}

      {!loading && error && (
        <div className="status status--error">
          <p>Something went wrong: {error}</p>
          <button type="button" className="btn" onClick={() => setReloadKey(reloadKey + 1)}>
            Try again
          </button>
        </div>
      )}

      {!loading && !error && products.length === 0 && (
        <p className="status">No products found for “{searchTerm}”.</p>
      )}

      {!loading && !error && products.length > 0 && (
        <>
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
        </>
      )}
    </div>
  );
}

export default Home;