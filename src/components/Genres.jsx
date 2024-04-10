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
      <h2>{type === 'movies' ? 'Movies' : 'TV Shows'}</h2>

      <div className='title_with_genres'>
        <p className=''>{`${
          genre
            ? `(${
                genresList.find((movieGenre) => movieGenre.id === genre).name
              })`
            : `(All)`
        }`}</p>
        <p onClick={() => setShowGenres((prevState) => !prevState)}>
          {showGenres ? 'Close filter' : 'Filter by genres'}
        </p>
      </div>

      <div className={`filter-genres ${showGenres ? 'active' : ''}`}>
        <div className='genres-header'>
          <p
            className={`reset-filter `}
            onClick={() => handleResetGenre(genre)}>
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
