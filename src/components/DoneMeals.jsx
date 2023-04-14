import copy from 'clipboard-copy';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';

function DoneMeals({ image, name, both, doneDate, index, tags, id }) {
  const [linkCopied, setLinkCopied] = useState(false);
  const handleClickCopied = () => {
    setLinkCopied(true);
    copy(`http://localhost:3000/meals/${id}`);
  };
  return (
    <div
      className="flex flex-col justify-start text-center w-52 bg-white radious-md
    max-w-sm shadow-2xl mb-5
    rounded-md m-2 opacity-90 h-64 relative"
      style={ { minHeight: 280 } }
    >
      <Link to={ `/meals/${id}` }>
        <p
          data-testid={ `${index}-horizontal-name` }
          className="font-pacifico text-orange-500 text-lg m-2"
        >
          { name }
        </p>
      </Link>
      <Link
        to={ `/meals/${id}` }
      >
        <img
          data-testid={ `${index}-horizontal-image` }
          src={ image }
          alt={ name }
          width="100"
          height="100"
          className="m-auto mt-1"
        />
      </Link>
      {
        tags.map((tagName) => (
          <div
            key={ tagName }
            data-testid={ `${index}-${tagName}-horizontal-tag` }
            className="font-pacifico text-orange-400 text-sm"
          >
            { tagName }
          </div>
        ))
      }
      <p
        data-testid={ `${index}-horizontal-top-text` }
        className="font-pacifico text-orange-300 text-sm"
      >
        { both}
      </p>

      <p
        data-testid={ `${index}-horizontal-done-date` }
        className="font-pacifico text-black text-sm"
      >
        { doneDate }
      </p>
      {linkCopied && <div className="font-pacifico text-orange-300 text-sm"> Link copied!</div>}
      <div className="flex flex-row justify-between">
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
    </div>
  );
}

DoneMeals.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  doneDate: PropTypes.number.isRequired,
  index: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  both: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default DoneMeals;
