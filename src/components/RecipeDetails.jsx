import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import copy from 'clipboard-copy';
import AppContext from '../context/AppContext';
import { fetchRecipeByIdAndType, RecipeType } from '../servers/fetchApi';
import Recomendations from './Recomendations';
import '../styles/RecipeDetails.css';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

export default function RecipeDetails({ type, recommendationType }) {
  const {
    recipe, setRecipe,
    ingredients, setIngredients,
    instructions, setInstructions,
    videoLink, setVideoLink,
    setTags,
    toggleFavorite, isFavorite,
    inProgress, isDone, markRecipeAsStarted,
  } = useContext(AppContext);
  const [isLoading, setLoading] = useState(true);
  const [linkCopied, setLinkCopied] = useState(false);
  const { id } = useParams();
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    async function fetchRecipe() {
      setLoading(true);

      try {
        const info = await fetchRecipeByIdAndType(id, type);

        if (info) {
          setRecipe(info.recipe);
          setIngredients(info.ingredients);
          setInstructions(info.instructions);
          setVideoLink(info.videoLink);
          setTags(info.tags);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchRecipe();
  }, [
    id, setRecipe, setIngredients, type,
    setLoading, setInstructions, setVideoLink, setTags,
  ]);

  const startRecipe = () => {
    markRecipeAsStarted();
    history.push(location.pathname.concat('/in-progress'));
  };

  const shareRecipe = () => {
    const path = recipe.type === RecipeType.MEAL ? 'meals' : 'drinks';
    copy(`http://localhost:3000/${path}/${id}`);
    setLinkCopied(true);
  };

  if (!isLoading) {
    return (
      <div
        className="overflow-y-scroll shadow-2xl
      bg-white rounded-md text-center m-2 opacity-90
       border-4"
      >
        <div
          className="font-pacifico text-orange-400 text-4xl m-3 "
          data-testid="recipe-title "
        >
          {(recipe.name).slice(0, 25)}
        </div>
        <div
          data-testid="recipe-category"
          className="font-pacifico text-orange-300 text-xl mb-3 "
        >
          {recipe.type === RecipeType.MEAL ? recipe.category : recipe.alcoholicOrNot}
        </div>
        <div>
          {recipe.image && <img
            src={ recipe.image }
            width="150px"
            alt={ recipe.image }
            data-testid="recipe-photo"
            className="flex flex-col justify-center m-auto mb-3"
          />}
        </div>
        <div
          className="shadow-2xl
          bg-orange-100 rounded-md text-center m-2 opacity-90
       border-4 border-orange-300 mt-4"
        >
          <div
            className="font-pacifico text-orange-300 text-xl mb-3 "
          >
            Ingrediens List
          </div>
          <div
            className="overflow-y-scroll"
            style={ { maxHeight: '200px' } }
          >
            <ul className="list-disc m-1">
              {ingredients.map(({ name, measure }, index) => (
                <li
                  key={ name }
                  data-testid={ `${index}-ingredient-name-and-measure` }
                >
                  {`${name} ---------- ${measure}`}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div
          className="shadow-2xl
          bg-orange-100 rounded-md text-center m-2 opacity-90
       border-4 border-color-orange  border-orange-300 mt-4"
          data-testid="instructions"
        >
          <div
            className="font-pacifico text-orange-300 text-xl mb-3 "
          >
            Description
          </div>
          <div
            className="overflow-y-scroll"
            style={ { maxHeight: '300px' } }
          >
            {instructions}
          </div>
        </div>
        {type === RecipeType.MEAL && (
          <iframe
            data-testid="video"
            width="240"
            height="150"
            src={ videoLink }
            title={ recipe.name }
            className="flex flex-col justify-center m-auto mt-4 mb-3"
          />
        )}

        <Recomendations type={ recommendationType } />

        <div className="social-buttons-div flex flex-row justify-between w-80 m-auto">
          <button
            name="Share"
            onClick={ shareRecipe }
          >
            <img
              data-testid="share-btn"
              name="Share"
              src={ shareIcon }
              alt="share icon"
              className="bg-orange-300 radious-lg m-1 p-2 rounded-md"
            />
          </button>
          <button
            name="Favorite"
            src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
            onClick={ toggleFavorite }
          >
            {isFavorite
              ? (
                <img
                  data-testid="favorite-btn"
                  name="Favorite"
                  src={ blackHeartIcon }
                  alt="share icon"
                  className="bg-orange-300 radious-lg m-1 p-2 rounded-md"
                />)
              : (
                <img
                  data-testid="favorite-btn"
                  name="Favorite"
                  src={ whiteHeartIcon }
                  alt="share icon"
                  className="bg-orange-300 radious-lg m-1 p-2 rounded-md"
                />)}
          </button>
        </div>
        {linkCopied && <div className="font-pacifico text-orange-300 text-sm"> Link copied!</div>}

        {!isDone && (
          <button
            data-testid="start-recipe-btn"
            name={ inProgress ? 'Continue Recipe' : 'Start Recipe' }
            className="m-4 w-44 rounded-full text-xl
            shadow-md bg-orange-300 hover:bg-orange-400 py-2 px-4"
            onClick={ startRecipe }
          >
            {inProgress ? 'Continue Recipe' : 'Start Recipe'}
          </button>
        )}
      </div>
    );
  }
}

RecipeDetails.propTypes = {
  type: PropTypes.oneOf(Object.values(RecipeType)).isRequired,
  recommendationType: PropTypes.oneOf(Object.values(RecipeType)).isRequired,
};
