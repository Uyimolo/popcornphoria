import { useParams } from 'react-router';
import {
  useGetMovieDetailQuery,
  useGetMovieVideosQuery,
  useGetMovieCreditsQuery,
  useGetSimilarMoviesQuery,
} from '../features/apiSlice';
import MovieCarousels from '../components/MovieCarousels';
import AddToWatchlist from '../components/AddToWatchlist';

const MovieDetails = () => {
  const { movieId } = useParams();

  const { data: movieData, isSuccess } = useGetMovieDetailQuery(movieId);
  let movie;
  if (isSuccess) {
    movie = movieData;
  }

  const { data: videoData, isSuccess: videoSuccess } =
    useGetMovieVideosQuery(movieId);

  let videoSrc;
  if (videoSuccess) {
    // check if an official trailer video exists
    const trailerVideo = videoData.results.find((video) =>
      video.name.toLowerCase().includes('official trailer')
    );
    // if it exists show the trailer video
    if (videoData.results.length < 1) {
      videoSrc = '';
    } else {
      if (trailerVideo) {
        videoSrc = `https://www.youtube.com/embed/${trailerVideo.key}`;
      } else {
        videoSrc = `https://www.youtube.com/embed/${videoData.results[0].key}`;
      }
    }

    // if no trailer video exists show the first video in array
  }

  const { data: similarMoviesData, isSuccess: similarMovieSuccess } =
    useGetSimilarMoviesQuery(movieId);

  let similarMovies;
  if (similarMovieSuccess) {
    similarMovies = similarMoviesData.results;
  }

  const { data: creditsData, isSuccess: creditsSuccess } =
    useGetMovieCreditsQuery(movieId);

  let credits;
  if (creditsSuccess) {
    credits = creditsData.cast.slice(0, 5).map((credit) => credit.name);
  }

  return (
    <div className='movie page'>
      <div className='trailer-video-container'>
        {/* if theres a trailer video or any video at all show it */}
        {videoSrc ? (
          <iframe
            className='trailer-video'
            src={videoSrc}
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
            title='Embedded youtube'
          />
        ) : //if no video show the poster image
        movie && movie.poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt=''
          />
        ) : (
          <div></div>
        )}
      </div>

      {movie && (
        <div className='movie-details'>
          <div className='title-details'>
            <h2>{movie.title}</h2>

            <p className='year'>{`${
              movie.release_date.split('-')[0]
            } | ${movie.vote_average.toFixed(1)} stars`}</p>

            <div className='genres'>
              {movie.genres.map((genre) => (
                <p className='genre' key={genre.id}>
                  {genre.name}
                </p>
              ))}
            </div>

            <div className='watchlist-button'>
              <AddToWatchlist
                poster_path={movie.poster_path}
                id={movie.id}
                media_type={'movie'}
                name={movie.title}
              />
            </div>

            {credits && <p>{`Starring: ${credits.join(' | ')}`}</p>}
          </div>

          <div className='story-line'>
            <h3>Story Line</h3>
            <p className='overview'>{movie.overview}</p>
          </div>

          {similarMovies && (
            <div className='similar-movies'>
              <MovieCarousels
                movieData={similarMovies}
                carouselTitle='Similar movies'
                type='movie'
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
