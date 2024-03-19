const CarouselTile = ({ imagePath }) => {
  return (
    <div className='carousel-tile'>
      <img
        src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`}
        alt=''
      />
    </div>
  );
};

export default CarouselTile;
