import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import background from '../images/Background.png';

function Profile() {
  const [profileEmail, setProfileEmail] = useState('');
  const history = useHistory();

  useEffect(() => {
    const { email } = JSON.parse(localStorage.getItem('user')) || {};
    setProfileEmail(
      email,
    );
  }, []);
  return (
    <div
      className="flex flex-col h-screen
     bg-orange-100 justify-sttar max-w-sm max-h-128 "
      style={ { backgroundImage: `url(${background})` } }
    >
      <Header title="Profile" hasSearchIcon={ false } />
      <div
        className="flex flex-col justify-center text-center bg-white radious-md
            max-w-sm shadow-2xl
            rounded-md m-2 opacity-90"
      >
        <p
          data-testid="profile-email"
          className="font-pacifico text-orange-400 text-2xl mt-3"
        >
          { profileEmail }
        </p>
        <div className="grid-cols-3 items-center m-1 mb-3 text-center">
          <button
            data-testid="profile-done-btn"
            onClick={ () => { history.push('/done-recipes'); } }
            className="m-2 w-20 rounded-4 bg-orange-300 hover:bg-orange-400 h-16 align-middle"
          >
            Done Recipes
          </button>
          <button
            data-testid="profile-favorite-btn"
            onClick={ () => { history.push('/favorite-recipes'); } }
            className="m-2 w-20 rounded-4 bg-orange-300 hover:bg-orange-400 h-16 align-middle"
          >
            Favorite Recipes
          </button>
          <button
            data-testid="profile-logout-btn"
            onClick={ () => {
              localStorage.clear();
              history.push('/');
            } }
            className="m-2 w-20 rounded-4 bg-orange-300 hover:bg-orange-400 h-16"
          >
            Logout
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
