import React from 'react';
import DoneRecipes from '../components/DoneRecipes';
import background from '../images/Background.png';

function DoneRecipe() {
  return (
    <div
      className="flex flex-col h-screen
   bg-orange-100 justify-start max-w-sm max-h-128 "
      style={ { backgroundImage: `url(${background})` } }
    >
      <DoneRecipes />
    </div>
  );
}

export default DoneRecipe;
