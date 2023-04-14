// Tela principal de receitas
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import CategoriesContext from '../context/CategoriesContext';
import Categories from './Categories';

function Recipes({ type, recipes }) {
  const { mealsCategories, drinksCategories } = useContext(CategoriesContext);
  const maxCategory = 5;
  const slicedMealsCategories = mealsCategories.slice(0, maxCategory);
  const slicedDrinksCategories = drinksCategories.slice(0, maxCategory);
  return (
    <div className="flex flex-col items-center">
      <Categories
        categories={ type === 'meal' ? slicedMealsCategories : slicedDrinksCategories }
      />
      <div className="flex flex-auto flex-wrap justify-center w-80 h-80 overflow-y-scroll">
        {recipes.map((recipe, index) => (
          <Link
            to={
              `/${type}s/${type === 'meal' ? recipe.idMeal : recipe.idDrink}` // recipe.idMeal || recipe.idDrink
            }
            key={ index }
          >
            <div
              data-testid={ `${index}-recipe-card` }
              className="flex flex-col justify-center text-center w-32 bg-white radious-md
            max-w-sm shadow-2xl
            rounded-md m-1 opacity-90"
            >
              <img
                data-testid={ `${index}-card-img` }
                className="w-28 m-2"
                src={
                  `${recipe[type === 'meal' ? 'strMealThumb' : 'strDrinkThumb']}/preview`
                  // recipe.strMealThumb || recipe.strDrinkThumb
                }
                alt={ type === 'meal' ? recipe.strMeal : recipe.strDrink }
              />
              <h3
                data-testid={ `${index}-card-name` }
              >
                {type === 'meal' ? recipe.strMeal : recipe.strDrink}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

Recipes.propTypes = {
  type: PropTypes.oneOf(['meal', 'drink']).isRequired,
  recipes: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.shape({
        strMeal: PropTypes.string.isRequired,
        strMealThumb: PropTypes.string.isRequired,
      }).isRequired,
    ).isRequired,
    PropTypes.arrayOf(
      PropTypes.shape({
        strDrink: PropTypes.string.isRequired,
        strDrinkThumb: PropTypes.string.isRequired,
      }).isRequired,
    ).isRequired,
  ]).isRequired,
};

export default Recipes;
