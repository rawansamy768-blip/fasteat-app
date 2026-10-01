 import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  // جلب التصنيفات الرئيسية
  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
      .then((res) => res.json())
      .then((data) => setCategories(data.categories || []));
  }, []);

  // وظيفة البحث
  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`)
      .then((res) => res.json())
      .then((data) => setSearchResults(data.meals || []));
  };

  return (
    <div className="home-page">
      {/* قسم البحث والترويسة */}
      <div style={styles.hero}>
        <div style={styles.heroOverlay}></div>
        <div style={styles.heroContent}>
          {/* شريط بحث أبيض مع زر وأيقونة باللون البرتقالي */}
          <form onSubmit={handleSearch} style={styles.searchForm}>
            <input
              type="text"
              placeholder="Search recipes here..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={styles.searchInput}
            />
            <button type="submit" style={styles.searchBtn}>
              <svg 
                viewBox="0 0 24 24" 
                width="18" 
                height="18" 
                fill="none" 
                stroke="#f26522" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
          </form>
          
          <h1 style={{ fontSize: '28px', margin: '15px 0 5px' }}>What are your favorite cuisines?</h1>
          <p style={{ letterSpacing: '2px', fontSize: '12px', textTransform: 'uppercase', opacity: 0.9 }}>
            Personalize your experience
          </p>
        </div>
      </div>

      {/* نتائج البحث */}
      {searchResults.length > 0 && (
        <div style={styles.container}>
          <h2 style={styles.sectionTitle}>Search Results</h2>
          <div style={styles.grid}>
            {searchResults.map((meal) => (
              <div
                key={meal.idMeal}
                onClick={() => navigate(`/meal/${meal.idMeal}`)}
                style={styles.card}
              >
                <img src={meal.strMealThumb} alt={meal.strMeal} style={styles.cardImg} />
                <div style={{ padding: '10px', textAlign: 'center' }}>
                  <h3 style={{ fontSize: '14px', margin: 0, color: '#333' }}>{meal.strMeal}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* عرض التصنيفات */}
      <div style={styles.container}>
        <h2 style={styles.sectionTitle}>Categories</h2>
        <div style={styles.grid}>
          {categories.map((cat) => (
            <Link
              to={`/category/${cat.strCategory}`}
              key={cat.idCategory}
              style={styles.categoryCard}
            >
              <span style={styles.tag}>{cat.strCategory}</span>
              <img src={cat.strCategoryThumb} alt={cat.strCategory} style={styles.catImg} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

const styles = {
  hero: {
    position: 'relative',
    backgroundImage: "url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    padding: '60px 20px',
    textAlign: 'center',
    color: '#fff',
  },
  heroOverlay: {
    position: 'absolute',
    inset: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  heroContent: {
    position: 'relative',
    zIndex: 1,
    maxWidth: '600px',
    margin: '0 auto',
  },
  // شريط البحث المحدث
  searchForm: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: '480px',
    width: '100%',
    margin: '0 auto 20px',
    position: 'relative',
    borderRadius: '30px',
    backgroundColor: '#ffffff',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
  },
  searchInput: {
    width: '100%',
    padding: '12px 45px 12px 20px',
    border: 'none',
    outline: 'none',
    fontSize: '15px',
    borderRadius: '30px',
    backgroundColor: 'transparent',
    color: '#333333',
  },
  searchBtn: {
    position: 'absolute',
    right: '15px',
    top: '50%',
    transform: 'translateY(-50%)',
    backgroundColor: 'transparent',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    padding: '0',
  },
  container: {
    maxWidth: '1100px',
    margin: '30px auto',
    padding: '0 20px',
  },
  sectionTitle: {
    fontSize: '20px',
    textTransform: 'uppercase',
    borderBottom: '3px solid #f26522',
    display: 'inline-block',
    paddingBottom: '5px',
    marginBottom: '20px',
    color: '#333',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
    gap: '20px',
  },
  categoryCard: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    padding: '15px',
    textDecoration: 'none',
    position: 'relative',
    boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tag: {
    position: 'absolute',
    top: '8px',
    right: '8px',
    backgroundColor: '#f26522',
    color: '#fff',
    fontSize: '10px',
    padding: '2px 6px',
    borderRadius: '3px',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  catImg: {
    width: '100px',
    height: '100px',
    objectFit: 'contain',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    overflow: 'hidden',
    cursor: 'pointer',
    boxShadow: '0 2px 5px rgba(0,0,0,0.08)',
  },
  cardImg: {
    width: '100%',
    height: '140px',
    objectFit: 'cover',
  },
};

export default Home;