// import { useEffect, useState } from 'react';

// const LazyCarouselImage = ({ poster_path, title }) => {
//   const [isLoading, setIsLoading] = useState(true);

//   // useEffect(() => {
//   //   const image = new Image();
//   //   image.onload = () => {
//   //     setIsLoading(false);
//   //   };
//   //   image.src = `https://image.tmdb.org/t/p/w92${poster_path}`;
//   // }, [poster_path]);
//   return (
//     <div>
//       {
//         <img
//           src={`https://image.tmdb.org/t/p/w92${poster_path}`}
//           alt={`${title}`}
//         />
//       }
//       {/* {isLoading && <div className='lazy-carousel-image'></div>} */}
//     </div>
//   );
// };

// export default LazyCarouselImage;

import React, { useEffect, useState } from 'react';

const LazyCarouselImage = ({ poster_path, title }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const image = new Image();
    image.onload = () => {
      setIsLoading(false);
    };
    image.src = `https://image.tmdb.org/t/p/w200${poster_path}`;
  }, [poster_path]);

  return (
    <div>
      {isLoading ? (
        <div className='lazy-carousel-image'></div>
      ) : (
        <img
          src={`https://image.tmdb.org/t/p/w200${poster_path}`}
          alt={`${title}`}
          loading='lazy'
        />
      )}
    </div>
  );
};

export default LazyCarouselImage;
