import React from 'react';
import RecipeDetails from '../components/RecipeDetails';
import { RecipeType } from '../servers/fetchApi';
import background from '../images/Background.png';

function DrinksRecipes() {
  return (
    <div
      className="flex flex-col h-screen
     bg-orange-100 justify-evenly max-w-sm max-h-128 "
      style={ { backgroundImage: `url(${background})` } }
    >
      <RecipeDetails type={ RecipeType.DRINK } recommendationType={ RecipeType.MEAL } />
    </div>
  );
}

export default DrinksRecipes;
