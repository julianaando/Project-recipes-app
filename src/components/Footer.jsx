// componente Footer criado por Juliana

import React from 'react';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  const history = useHistory();

  const handleButtonDrinks = () => {
    history.push('/drinks');
  };

  const handleButtonMeals = () => {
    history.push('/meals');
  };

  return (
    <footer
      data-testid="footer"
      className="flex flex-row justify-between w-86 fixed bottom-0"
    >
      <button
        data-testid="drinks-bottom-btn"
        src={ drinkIcon }
        onClick={ handleButtonDrinks }
        className=" bg-orange-300 radious-lg m-1 p-2 rounded-md"
      >
        <img src={ drinkIcon } alt="drink icon" />
      </button>
      <button
        data-testid="meals-bottom-btn"
        src={ mealIcon }
        onClick={ handleButtonMeals }
        className=" bg-orange-300 radious-lg m-1 p-2 rounded-md"
      >
        <img src={ mealIcon } alt="meal icon" />
      </button>
    </footer>
  );
}

export default Footer;
