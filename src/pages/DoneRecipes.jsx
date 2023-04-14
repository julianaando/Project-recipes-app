import React from 'react';
import Header from '../components/Header';
import background from '../images/Background.png';

function DoneRecipes() {
  return (
    <div
      className="flex flex-col h-screen
     bg-orange-100 justify-start max-w-sm max-h-128 "
      style={ { backgroundImage: `url(${background})` } }
    >
      <Header title=" Done Recipes" hasSearchIcon={ false } />
    </div>
  );
}

export default DoneRecipes;
