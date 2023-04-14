import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import copy from 'clipboard-copy';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import background from '../images/Background.png';

function FavoriteRecipes() {
  const [list, setList] = useState([{ info: 'none' }]);
  const [linkCopied, setLinkCopied] = useState(false);
  const [indexClicked, setIndexClick] = useState('');

  useEffect(() => {
    if ('favoriteRecipes' in localStorage) {
      const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
      if (favoriteRecipes.length === 0) {
        setList([{ info: 'none' }]);
      } else {
        setList(favoriteRecipes);
      }
    }
  }, [setList]);

  const handleFilter = ({ target: { name } }) => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const favMeals = favoriteRecipes.filter((meal) => meal.type === 'meal');
    const favDrinks = favoriteRecipes.filter((drink) => drink.type === 'drink');
    if (name === 'meals' && favMeals.length >= 1) {
      setList(favMeals);
    } else if (name === 'drinks' && favDrinks.length >= 1) {
      setList(favDrinks);
    } else if (name === 'all') {
      if (favoriteRecipes.length !== 0) {
        setList(favoriteRecipes);
      } else {
        setList([{ info: 'none' }]);
      }
    } else {
      setList([{ info: 'none' }]);
    }
  };

  const handleShare = ({ target: { name, id, className } }) => {
    setLinkCopied(true);
    setIndexClick(className);
    return copy(`http://localhost:3000/${name}s/${id}`);
  };

  const handleFavorite = ({ target: { id } }) => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const newfavoriteRecipes = favoriteRecipes.filter((e) => e.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newfavoriteRecipes));
    if (newfavoriteRecipes.length !== 0) {
      setList(newfavoriteRecipes);
    } else {
      setList([{ info: 'none' }]);
    }
  };

  return (
    <div
      className="flex flex-col h-screen
     bg-orange-100 justify-start max-w-sm max-h-128 "
      style={ { backgroundImage: `url(${background})` } }
    >
      <Header title="Favorite Recipes" hasSearchIcon={ false } />
      <div className="flex flex-col items-center">
        <div className="section-container grid-cols-3 items-center m-1 mb-3 text-center">
          <button
            type="button"
            data-testid="filter-by-meal-btn"
            name="meals"
            onClick={ handleFilter }
            className="m-2 w-20 rounded-full bg-orange-300 hover:bg-orange-400 h-6"
          >
            Meals
          </button>

          <button
            type="button"
            data-testid="filter-by-drink-btn"
            name="drinks"
            onClick={ handleFilter }
            className="m-2 w-20 rounded-full bg-orange-300 hover:bg-orange-400 h-6"
          >
            Drinks
          </button>

          <button
            type="button"
            data-testid="filter-by-all-btn"
            name="all"
            onClick={ handleFilter }
            className="m-2 w-20 rounded-full bg-orange-300 hover:bg-orange-400 h-6"
          >
            All
          </button>
        </div>
        <div className="flex flex-row flex-wrap justify-center w-80 h-96 overflow-y-scroll">
          {(list[0].info !== 'none') ? list.map((favorite, index) => (
            <div
              className="flex flex-col justify-center text-center w-32 bg-white radious-md
            max-w-sm shadow-2xl
            rounded-md m-2 opacity-90 h-64"
              key={ index }
            >
              <Link
                to={ `/${favorite.type}s/${favorite.id}` }
                className="card-title-favorite-link"
              >
                <img
                  src={ favorite.image }
                  alt={ favorite.type }
                  className="w-28 mt-3 m-auto"
                  data-testid={ `${index}-horizontal-image` }
                />
                <div
                  data-testid={ `${index}-horizontal-name` }
                  className="font-pacifico text-orange-400 text-base"
                >
                  { favorite.name }
                </div>

              </Link>
              <div
                data-testid={ `${index}-horizontal-top-text` }
                className="card-subtitle-favorite"
                className="font-pacifico text-orange-300 text-sm"
              >
                { favorite.alcoholicOrNot !== ''
                  ? favorite.alcoholicOrNot
                  : `${favorite.nationality} - ${favorite.category}` }
              </div>
              <div className="flex flex-row justify-between">
                <button
                  type="button"
                  onClick={ handleFavorite }
                  className="bg-orange-300 radious-lg m-1 p-2 rounded-md"
                >
                  <img
                    data-testid={ `${index}-horizontal-favorite-btn` }
                    src={ blackHeartIcon }
                    alt="Favorite Button"
                    id={ favorite.id }
                  />
                </button>

                <button
                  data-testid={ `${index}-horizontal-share-btn` }
                  type="button"
                  src={ shareIcon }
                  onClick={ handleShare }
                  className="bg-orange-300 radious-lg m-1 p-2 rounded-md"
                >
                  <img
                    src={ shareIcon }
                    alt="Share Button"
                    id={ favorite.id }
                    name={ favorite.type }
                    className={ index }
                  />
                </button>
              </div>
              {(linkCopied && indexClicked === String(index)) && <div className="font-pacifico text-orange-300 text-sm"> Link copied!</div>}
            </div>
          ))
            : (
              <div
                className="font-pacifico text-black text-5xl"
              >
                Empty...
              </div>
            )}

        </div>
      </div>
    </div>
  );
}

export default FavoriteRecipes;
