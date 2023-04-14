import copy from 'clipboard-copy';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';

function DoneDrinks({ image, name, alcoholicOrNot, doneDate, index, id }) {
  const [linkCopied, setLinkCopied] = useState(false);
  const handleClickCopied = () => {
    setLinkCopied(true);
    copy(`http://localhost:3000/drinks/${id}`);
  };
  return (
    <div
      className="flex flex-col justify-start text-center w-52 bg-white radious-md
    max-w-sm shadow-2xl mb-5
    rounded-md m-2 opacity-90 h-64 relative"
      style={ { minHeight: 280 } }
    >
      <Link
        to={ `/drinks/${id}` }
      >
        <p
          data-testid={ `${index}-horizontal-name` }
          className="font-pacifico text-orange-500 text-lg m-2"
        >
          { name }
        </p>
      </Link>
      <Link
        to={ `/drinks/${id}` }
      >
        <img
          data-testid={ `${index}-horizontal-image` }
          src={ image }
          alt={ name }
          width="100"
          height="100"
          className="m-auto mt-1 mb-2"
        />
      </Link>
      <p
        data-testid={ `${index}-horizontal-top-text` }
        className="font-pacifico text-orange-400 text-sm"
      >
        { alcoholicOrNot }
      </p>
      <p
        data-testid={ `${index}-horizontal-done-date` }
        className="font-pacifico text-black text-sm"
      >
        { doneDate }
      </p>
      {linkCopied && <div> Link copied!</div>}
      <button
        type="button"
        onClick={ handleClickCopied }
        className="bg-orange-300 radious-lg p-2 rounded-md absolute"
        style={ { bottom: '-23.5px', left: 80.5 } }
      >
        <img
          data-testid={ `${index}-horizontal-share-btn` }
          name="Share"
          src={ shareIcon }
          alt="share icon"
        />

      </button>
    </div>
  );
}

DoneDrinks.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  alcoholicOrNot: PropTypes.string.isRequired,
  doneDate: PropTypes.string.isRequired,
  index: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default DoneDrinks;
