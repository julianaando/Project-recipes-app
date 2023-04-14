import React, { useContext, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { TextField } from '@mui/material';
import RecipesContext from '../context/RecipesContext';
import fetchApi from '../servers/fetchApi';

function SearchBar() {
  const [recipesType, setRecipesType] = useState('');
  const [inputSearch, setInputSearch] = useState('');
  const { handleSetMealsOrDrinks } = useContext(RecipesContext);
  const location = useLocation();
  const history = useHistory();
  const isAtDrinkPage = location.pathname.includes('/drinks');
  const drinksOrMeals = isAtDrinkPage ? 'thecocktaildb' : 'themealdb';
  const drinksOrMealsKeys = isAtDrinkPage ? 'drinks' : 'meals';
  const id = isAtDrinkPage ? 'idDrink' : 'idMeal';

  const handleTypeRadio = ({ target }) => {
    const { value } = target;
    setRecipesType(
      value,
    );
  };
  const handleInputSearch = ({ target }) => {
    const { value } = target;
    setInputSearch(
      value,
    );
  };
  const fetchResults = async () => { // um fetch para cada tipo de busca
    if (recipesType === 'ingredient') {
      return fetchApi(`https://www.${drinksOrMeals}.com/api/json/v1/1/filter.php?i=${inputSearch}`);
    }

    if (recipesType === 'name') {
      return fetchApi(`https://www.${drinksOrMeals}.com/api/json/v1/1/search.php?s=${inputSearch}`);
    }

    return fetchApi(`https://www.${drinksOrMeals}.com/api/json/v1/1/search.php?f=${inputSearch}`);
  };

  const handleButtonSearch = async () => {
    if (recipesType === 'first-letter' && inputSearch.length !== 1) { // se for busca por letra, só pode ter 1 caracter
      global.alert('Your search must have only 1 (one) character');
      return;
    }

    const response = await fetchResults();
    const results = response[drinksOrMealsKeys]; // resultados do fetch

    handleSetMealsOrDrinks(results); // seta o estado com os resultados da busca

    if (results?.length === 1) { // se tiver apenas 1 resultado, redireciona para a página de detalhes
      history.push(`/${drinksOrMealsKeys}/${results[0][id]}`); // redireciona para a página de detalhes
    }
  };

  // useEffect(() => {
  //   if (listMealsOrDrinks.length === 1) {
  //     const idDrinkOrMeals = listMealsOrDrinks[0][id];
  //     history.push(`/${drinksOrMealsKeys}/${idDrinkOrMeals}`);
  //   }
  // }, [listMealsOrDrinks, isAtDrinkPage, history, drinksOrMealsKeys, id]);

  return (
    <div className="flex flex-col items-center">
      <div>
        <TextField
          id="input-with-sx"
          label="Search"
          variant="outlined"
          className=" bg-white "
          name="email"
          type="text"
          size="small"
          data-testid="search-input"
          color="warning"
          value={ inputSearch }
          onChange={ handleInputSearch }
        />
      </div>
      <div className="text-center items-center mt-2 ">
        <input
          data-testid="ingredient-search-radio"
          type="radio"
          name="recipes_type"
          id="ingredient"
          className="mr-2 ml-2 align-middle"
          value="ingredient"
          onChange={ handleTypeRadio }
        />
        <label htmlFor="ingredient">ingredient</label>
        <input
          data-testid="name-search-radio"
          type="radio"
          name="recipes_type"
          id="name"
          className="mr-2 ml-2 align-middle"
          value="name"
          onChange={ handleTypeRadio }
        />
        <label htmlFor="name"> name </label>

        <input
          data-testid="first-letter-search-radio"
          type="radio"
          name="recipes_type"
          className="mr-2 ml-2 align-middle"
          id="first-letter"
          value="first-letter"
          onChange={ handleTypeRadio }
        />
        <label htmlFor="first-letter"> first letter </label>
      </div>

      <button
        data-testid="exec-search-btn"
        onClick={ handleButtonSearch }
        className="m-1 mt-2 w-20 rounded-full bg-orange-300 hover:bg-orange-400"
      >
        Search
      </button>
    </div>
  );
}
export default SearchBar;
