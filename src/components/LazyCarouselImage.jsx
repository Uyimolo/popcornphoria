import { useState } from 'react';

const LazyCarouselImage = ({ poster_path, title }) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoad = () => {
    setIsLoading(false);
  };
  return (
    <div>
      {
        <img
          onLoad={handleImageLoad}
          loading='lazy'
          src={`https://image.tmdb.org/t/p/w92${poster_path}`}
          alt={`${title}`}
          style={{ display: isLoading ? 'none' : 'block' }}
        />
      }
      {isLoading && <div className='lazy-carousel-image'></div>}
    </div>
  );
};

export default LazyCarouselImage;
