import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from '../context/AppContext';
import { RecipeType, fetchRecommendationsByType } from '../servers/fetchApi';

export default function Recomendations({ type }) {
  const { recommendations, setRecommendations } = useContext(AppContext);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    async function getList() {
      setLoading(true);

      try {
        setRecommendations(
          await fetchRecommendationsByType(type),
        );
      } finally {
        setLoading(false);
      }
    }
    getList();
  }, [type, setRecommendations, setLoading]);

  if (isLoading) {
    return null;
  }

  return (
    <div
      className="flex flex-col bg-white shadow-2xl
    rounded-md m-1 opacity-90 "
    >
      <div
        className="font-pacifico text-orange-300 text-xl mb-2 "
      >
        Recomendations
      </div>
      <div
        className="flex flex-row bg-orange-100 rounded-md
     shadow-2xl overflow-x-scroll justify-start m-4"
      >
        {
          recommendations.map(({ recipe }, index) => (
            <div
              key={ index }
              data-testid={ `${index}-recommendation-card` }
              className="mt-2 mr-1 rounded-md"
              style={ { minWidth: '50%' } }
            >
              <img
                src={ recipe.image }
                alt={ recipe.name }
              />
              <div
                data-testid={ `${index}-recommendation-title` }
                className="font-pacifico text-black text-base mb-2 "
              >
                {recipe.name}
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
}

Recomendations.propTypes = {
  type: PropTypes.oneOf(Object.values(RecipeType)).isRequired,
};
