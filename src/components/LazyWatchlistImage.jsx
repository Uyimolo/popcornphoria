import React, { useEffect, useState } from 'react';

const LazyWatchlistImage = ({ poster_path, title }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const image = new Image();
    image.onload = () => {
      setIsLoading(false);
    };
    image.src = `https://image.tmdb.org/t/p/w154${poster_path}`;
  }, [poster_path]);

  return (
    <div>
      {isLoading ? (
        <div className='watchlist-image-placeholder'></div>
      ) : (
        <img
          src={`https://image.tmdb.org/t/p/w154${poster_path}`}
          alt={`${title}`}
        />
        // <div className='watchlist-image-placeholder'></div>
      )}
    </div>
  );
};

export default LazyWatchlistImage;
