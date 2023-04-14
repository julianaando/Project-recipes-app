import React from 'react';
import RecipeInProgress from '../components/RecipeInProgress';
import { RecipeType } from '../servers/fetchApi';
import background from '../images/Background.png';

function MealsProgress() {
  return (
    <div
      className="flex flex-col h-screen
     bg-orange-100 justify-evenly max-w-sm max-h-128 "
      style={ { backgroundImage: `url(${background})` } }
    >
      <RecipeInProgress type={ RecipeType.MEAL } />
    </div>
  );
}

export default MealsProgress;
