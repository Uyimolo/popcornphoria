import { useEffect, useState } from 'react';

const LazyCarouselImage = ({ poster_path, title }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const image = new Image();
    image.onload = () => {
      setIsLoading(false);
    };
    image.src = `https://image.tmdb.org/t/p/w92${poster_path}`;
  }, [poster_path]);
  return (
    <div>
      {
        <img
          loading='lazy'
          src={`https://image.tmdb.org/t/p/w200${poster_path}`}
          alt={`${title}`}
          style={{ display: isLoading ? 'none' : 'block' }}
        />
      }
      {isLoading && <div className='lazy-carousel-image'></div>}
    </div>
  );
};

export default LazyCarouselImage;
