import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import Logo from '../images/Logo.png';

function Header({ title, hasSearchIcon }) {
  const history = useHistory();
  const [showInput, setShowinput] = useState(false);

  const handleButtonProfile = () => {
    history.push('/profile');
  };

  const handleButtonSearch = () => {
    setShowinput(
      !showInput,
    );
  };

  return (
    <div
      className=" flex flex-col justify-evenly items-center
       bg-white radious-md
       max-w-sm shadow-2xl
       rounded-md m-1 opacity-90 "
    >
      <div
        className=" flex flex-row justify-between
       bg-white m-1 w-80 "
      >
        <img
          src={ Logo }
          alt="profile icon"
          data-testid="profile-top-btn"
          className=" h-10 "
        />
        <h1
          data-testid="page-title"
          className="font-pacifico
          text-orange-400 text-3xl m-1"
        >
          { title }
        </h1>
        <button
          onClick={ handleButtonProfile }
        >
          <img
            src={ profileIcon }
            alt="profile icon"
            data-testid="profile-top-btn"
          />
        </button>
      </div>
      { hasSearchIcon
      && (
        <div className="flex flex-row justify-around m-2 w-80">
          <button
            onClick={ handleButtonSearch }
          >
            <img src={ searchIcon } alt="search icon" data-testid="search-top-btn" />
          </button>
          { showInput && <SearchBar />}
        </div>
      )}
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  hasSearchIcon: PropTypes.bool.isRequired,
};

export default Header;
