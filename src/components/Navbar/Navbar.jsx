     import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
      .then((res) => res.json())
      .then((data) => setCategories(data.categories || []));
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="logo">
          <svg className="home-icon" viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
          </svg>
          FastEat.
        </Link>

        <button className="menu-btn" onClick={toggleSidebar}>
          ☰
        </button>
      </nav>

      {isOpen && <div className="sidebar-overlay" onClick={toggleSidebar}></div>}

      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h3>Categories</h3>
          <button className="close-btn" onClick={toggleSidebar}>✕</button>
        </div>
        <ul className="sidebar-list">
          {categories.map((cat) => (
            <li key={cat.idCategory}>
              <Link 
                to={`/category/${cat.strCategory}`} 
                onClick={toggleSidebar}
              >
                {cat.strCategory}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Navbar;