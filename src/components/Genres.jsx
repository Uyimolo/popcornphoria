import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const Genres = ({
  genre,
  genresList,
  setShowGenres,
  handleFilterByGenre,
  handleResetGenre,
}) => {
  return (
    <div className='filter-genres'>
      <div className='genres-header'>
        {genre && (
          <p className='reset-filter' onClick={handleResetGenre}>
            Reset filter
          </p>
        )}

       
      </div>
      <div className='genres'>
        {genresList.map((genreOption) => (
          <p
            className={`filter-genre ${
              genre === genreOption.id ? 'active' : ''
            }`}
            key={genreOption.id}
            onClick={() => handleFilterByGenre(genreOption.id)}>
            {genreOption.name}
          </p>
        ))}
      </div>
       <FontAwesomeIcon
          icon={faTimes}
          onClick={() => setShowGenres(false)}
          className='awesome'
        />
    </div>
  );
};

export default Genres;
