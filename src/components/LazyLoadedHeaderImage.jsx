import React from 'react';

const LazyLoadedHeaderImage = ({ poster_path, film_title }) => {
  return (
    <img      loading='lazy'
      src={`https://image.tmdb.org/t/p/w342${poster_path}`}
      alt={`${film_title}`}
    />
  );
};

export default LazyLoadedHeaderImage;
