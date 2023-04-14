import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams, useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';
import AppContext from '../context/AppContext';
import { fetchRecipeByIdAndType, RecipeType } from '../servers/fetchApi';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

export default function RecipeInProgress({ type }) {
  const {
    recipe, setRecipe,
    ingredients, setIngredients,
    setInstructions, setVideoLink,
    setTags,
    toggleFavorite, isFavorite,
    markRecipeAsDone,
  } = useContext(AppContext);
  const [isLoading, setLoading] = useState(true);
  const [linkCopied, setLinkCopied] = useState(false);
  const [ingredientCheck, setIngredientCheck] = useState([]);
  const { id } = useParams();
  const history = useHistory();

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
  }, [id, setRecipe, setIngredients, type, setTags,
    setLoading, setInstructions, setVideoLink]);

  useEffect(() => {
    const newIngredientCheck = ingredients.map((ingredient) => ({
      name: ingredient.name,
      measure: ingredient.measure,
      checked: false,
    }));
    // TODO: também salvar no localStorage
    setIngredientCheck(newIngredientCheck);
  }, [ingredients]);

  const shareRecipe = () => {
    const path = recipe.type === RecipeType.MEAL ? 'meals' : 'drinks';
    copy(`http://localhost:3000/${path}/${id}`);
    setLinkCopied(true);
  };

  const finishRecipe = () => {
    markRecipeAsDone();
    history.push('/done-recipes');
  };

  if (!isLoading) { // Confere se os dados da receita já foram carregados
    return (
      <div
        className="overflow-y-scroll shadow-2xl
      bg-white rounded-md text-center m-2 opacity-90
       border-4"
      >
        <div
          data-testid="recipe-title"
          className="font-pacifico text-orange-400 text-4xl m-3 "
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
            width="200px"
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
            className="font-pacifico text-orange-300 text-xl mb-3 mt-2 "
          >
            Ingrediens List
          </div>
          <div>
            <ul style={ { listStyleType: 'none' } }>
              {ingredientCheck.map((ingredient, index) => (
                <li
                  key={ index }
                  data-testid={ `${index}-ingredient-step` }
                  style={ { textDecoration: ingredient.checked
                    ? 'line-through solid rgb(0,0,0)' : 'none' } }
                >
                  <input
                    type="checkbox"
                    checked={ ingredient.checked }
                    onChange={ () => {
                      const newList = [...ingredientCheck]; // Copia o array
                      newList[index].checked = !newList[index].checked; // Altera o valor do item para o oposto
                      setIngredientCheck(newList); // Atualiza o estado
                    } }
                  />
                  {ingredient.name}
                  -
                  {ingredient.measure === null ? '' : ingredient.measure}
                </li>
              ))}
            </ul>
          </div>
          <div data-testid="instructions">
            {recipe.instructions}
          </div>
        </div>
        <div className="social-buttons-div flex flex-row justify-between w-80 m-auto mt-3">
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
            {isFavorite ? (
              <img
                data-testid="favorite-btn"
                name="Favorite"
                src={ blackHeartIcon }
                alt="share icon"
                className="bg-orange-300 radious-lg m-1 p-2 rounded-md"
              />
            ) : (
              <img
                data-testid="favorite-btn"
                name="Favorite"
                src={ whiteHeartIcon }
                alt="share icon"
                className="bg-orange-300 radious-lg m-1 p-2 rounded-md"
              />
            )}
          </button>
        </div>
        {linkCopied && <div> Link copied!</div>}
        <button
          data-testid="finish-recipe-btn"
          name="Finish"
          disabled={ !ingredientCheck.every((ingredient) => ingredient.checked) }
          className="m-4 w-44 rounded-full text-xl
            shadow-md bg-orange-300 hover:bg-orange-400 py-2 px-4 disabled:bg-orange-200 disabled:text-white"
          onClick={ finishRecipe }
        >
          Finish Recipe
        </button>
      </div>
    );
  }
}

RecipeInProgress.propTypes = {
  type: PropTypes.oneOf(Object.values(RecipeType)).isRequired,
};
