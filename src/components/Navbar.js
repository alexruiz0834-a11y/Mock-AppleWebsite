import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function Navbar() {
  const { totalItems } = useCart();

  return (
    <header className="navbar">
      <div className="navbar__inner">
        <Link to="/" className="navbar__brand">
          ◐ Nimbus
        </Link>

        <nav className="navbar__links">
          <NavLink exact to="/" activeClassName="is-active">
            Store
          </NavLink>
          <NavLink to="/cart" activeClassName="is-active">
            Cart ({totalItems})
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;