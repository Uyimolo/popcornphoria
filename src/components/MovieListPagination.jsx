import MovieCard from './MovieCard';

const MovieListPagination = ({ movieList }) => {
  return (
    <div className='movies-container'>
      {movieList.map((movie) => (
        <MovieCard movie={movie} />
      ))}
    </div>
  );
};

export default MovieListPagination;
