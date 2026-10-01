     import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const MealList = () => {
  const { categoryName } = useParams();
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`)
      .then((res) => res.json())
      .then((data) => setMeals(data.meals || []));
  }, [categoryName]);

  return (
    <div style={{ maxWidth: '1100px', margin: '30px auto', padding: '0 20px' }}>
      {/* Breadcrumb */}
      <div style={{ backgroundColor: '#f26522', color: 'white', padding: '10px 18px', borderRadius: '4px', marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
        <Link to="/" style={{ color: 'white', display: 'inline-flex', alignItems: 'center' }}>
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
          </svg>
        </Link>
        <span style={{ margin: '0 6px' }}>»</span>
        <span style={{ textTransform: 'uppercase', fontWeight: 'bold' }}>{categoryName}</span>
      </div>

      <h2 style={{ fontSize: '20px', borderBottom: '3px solid #f26522', display: 'inline-block', paddingBottom: '5px', marginBottom: '20px', color: '#333' }}>
        {categoryName?.toUpperCase()} MEALS
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
        {meals.map((meal) => (
          <Link to={`/meal/${meal.idMeal}`} key={meal.idMeal} style={{ textDecoration: 'none', color: 'inherit', background: '#fff', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <img src={meal.strMealThumb} alt={meal.strMeal} style={{ width: '100%', height: '160px', objectFit: 'cover' }} />
            <div style={{ padding: '12px', textAlign: 'center' }}>
              <h3 style={{ fontSize: '14px', margin: 0, color: '#333' }}>{meal.strMeal}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MealList;