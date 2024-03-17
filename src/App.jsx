import './App.css';

import { useGetMoviesQuery } from './features/apiSlice';

function App() {
  const {
    data: movieData,
    isError,
    isLoading,
    isSuccess,
  } = useGetMoviesQuery();

  console.log(movieData);

  let content;

  if (isSuccess) {
    content = movieData.results.map((movie) => (
      <div className='' key={movie.id}>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt=''
        />
        <p>{movie.title}</p>
      </div>
    ));
  }
  return <div>{content}</div>;
}

export default App;
