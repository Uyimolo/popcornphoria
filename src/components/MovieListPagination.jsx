import MovieCard from './MovieCard';

const MovieListPagination = ({ movieList, type }) => {
  return (
    <div className='movies-container'>
      {movieList.map((movie) => (
        <MovieCard key={movie.id} movie={movie} type={type} />
      ))}
    </div>
  );
};

export default MovieListPagination;
