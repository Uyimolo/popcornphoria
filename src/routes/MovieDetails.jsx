import { useParams } from 'react-router';

const MovieDetails = () => {
  const { movieId } = useParams();
  console.log(movieId);
  return <div></div>;
};

export default MovieDetails;
