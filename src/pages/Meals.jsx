import React, { useContext } from 'react';
// import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import background from '../images/Background.png';
import Recipes from '../components/Recipes';
import RecipesContext from '../context/RecipesContext';

function Meals() {
  const { listMealsOrDrinks } = useContext(RecipesContext);
  // const history = useHistory();

  // Tirei o useEffect aqui, pois estava dando conflito com a lógica do SearchBar.

  // useEffect(() => {
  //   if (listMealsOrDrinks.length === 1) {
  //     const idDrinkOrMeals = listMealsOrDrinks[0].idMeal;
  //     history.push(`/meals/${idDrinkOrMeals}`);
  //   }
  // }, [listMealsOrDrinks, history]);
  const maxNumber = 12;
  const newListDrinks = listMealsOrDrinks.slice(0, maxNumber);

  return (
    <div
      className="flex flex-col h-screen
     bg-orange-100 max-w-sm max-h-128 m-0 justify-start "
      style={ { backgroundImage: `url(${background})` } }
    >
      <Header title="Meals" hasSearchIcon />
      <Recipes type="meal" recipes={ newListDrinks } />
      <Footer />
    </div>
  );
}

export default Meals;
