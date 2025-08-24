import { PersonAdd, ShoppingCart, Search, Close } from '@mui/icons-material'
import React, { useState } from 'react'
import './Navbar.css';


const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const isAuthenticated=false;
  return (
    <nav className="navbar-container">
      {/* Left: Logo and Brand */}
      <div className="navbar-logo">
  <img src="/sika-logo.png" alt="Sika Logo" style={{ width: '40px', height: '40px', marginRight: '12px', borderRadius: '50%', objectFit: 'cover' }} />
        <span style={{ fontWeight: 'bold', fontSize: '1.5rem', color: '#1a202c', letterSpacing: '2px' }}>Sika</span>
      </div>
      {/* Center: Links */}
      <ul className={`navbar-links${menuOpen ? ' open' : ''}`}>
        {/* Cross icon for closing drawer on mobile */}
        {menuOpen && (
          <li style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', marginBottom: '1.5rem' }}>
            <button
              onClick={() => setMenuOpen(false)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '2rem', color: '#333' }}
              aria-label="Close menu"
            >
              <Close />
            </button>
          </li>
        )}
        <li><a href="/" style={{ textDecoration: 'none', color: '#333', fontWeight: 500 }} onClick={() => setMenuOpen(false)}>Home</a></li>
        <li><a href="/product" style={{ textDecoration: 'none', color: '#333', fontWeight: 500 }} onClick={() => setMenuOpen(false)}>Product</a></li>
        <li><a href="/about" style={{ textDecoration: 'none', color: '#333', fontWeight: 500 }} onClick={() => setMenuOpen(false)}>About Us</a></li>
        <li><a href="/contact" style={{ textDecoration: 'none', color: '#333', fontWeight: 500 }} onClick={() => setMenuOpen(false)}>Contact Us</a></li>
      </ul>
      {/* Right: Search, Cart, Register, Hamburger */}
      <div className="navbar-actions">
        <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#333', fontSize: '1.7rem', display: 'flex', alignItems: 'center' }} aria-label="Search">
          <Search />
        </button>
        <a href="/cart" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: '#333', fontSize: '1.5rem', padding: '0 0.5rem' }} title="Cart">
          <ShoppingCart />
        </a>
        {!isAuthenticated && <a href="/register" style={{
          padding: '0.4rem 1rem',
          background: '#f59e42',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          fontWeight: 500,
          cursor: 'pointer',
          fontSize: '1rem',
          textDecoration: 'none',
          marginLeft: '0.5rem',
          display:"flex",
          alignItems:"center",
          gap:"0.3rem"
        }}>
          <PersonAdd />
        </a> }
        
        {/* Hamburger for mobile - only show when drawer is closed */}
        <button
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
          style={{ display: menuOpen ? 'none' : undefined }}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
}

export default Navbar