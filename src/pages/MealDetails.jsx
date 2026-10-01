      import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './MealDetails.css';

const MealDetails = () => {
  const { id } = useParams();
  const [meal, setMeal] = useState(null);

  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.meals) setMeal(data.meals[0]);
      });
  }, [id]);

  if (!meal) return <div className="loading">Loading details...</div>;

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    if (ingredient && ingredient.trim()) {
      ingredients.push(ingredient);
    }
  }

  return (
    <div className="details-container">
      {/* شريط المسار Breadcrumb */}
      <div className="breadcrumb">
        <Link to="/" style={{ display: 'inline-flex', alignItems: 'center' }} title="Home">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
          </svg>
        </Link>
        <span style={{ margin: '0 6px' }}>»</span>
        
        {meal.strCategory && (
          <>
            <Link 
              to={`/category/${meal.strCategory}`}
              style={{ color: '#fff', textDecoration: 'underline' }}
            >
              {meal.strCategory.toUpperCase()}
            </Link>
            <span style={{ margin: '0 6px' }}>»</span>
          </>
        )}

        <span className="uppercase">{meal.strMeal}</span>
      </div>

      <h2 className="section-header">MEAL DETAILS</h2>

      <div className="details-card">
        <div className="image-container">
          <img src={meal.strMealThumb} alt={meal.strMeal} />
        </div>

        <div className="content-container">
          <h1 className="meal-title">{meal.strMeal}</h1>
          <p className="category-text">
            CATEGORY: <span>{meal.strCategory}</span>
          </p>
          {meal.strSource && (
            <p className="source-text">
              Source: <a href={meal.strSource} target="_blank" rel="noreferrer">{meal.strSource}</a>
            </p>
          )}

          <div className="ingredients-box">
            <h3>Ingredients:</h3>
            <div className="ingredients-grid">
              {ingredients.map((item, index) => (
                <div key={index} className="ingredient-item">
                  <span className="num">{index + 1}</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealDetails;