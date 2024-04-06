import { useEffect, useLayoutEffect, useRef } from 'react';

const Genres = ({
  genre,
  genresList,
  showGenres,
  setShowGenres,
  handleFilterByGenre,
  handleResetGenre,
  type,
}) => {
  return (
    <div className='genres-container'>
      <div className='title_with_genres'>
        <h3 className=''>{`${type === 'movies' ? 'Movies' : 'TV Shows'} ${
          genre
            ? `(${
                genresList.find((movieGenre) => movieGenre.id === genre).name
              })`
            : `(All)`
        }`}</h3>
        <p onClick={() => setShowGenres((prevState) => !prevState)}>
          {showGenres ? 'Close filter' : 'Filter by genres'}
        </p>
      </div>

      <div className={`filter-genres ${showGenres ? 'active' : ''}`}>
        <div className='genres-header'>
          <p className={`reset-filter `} onClick={genre && handleResetGenre}>
            {genre ? 'Reset filter' : 'Select genre'}
          </p>
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
      </div>
    </div>
  );
};

export default Genres;
