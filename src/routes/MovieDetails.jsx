import { useParams } from 'react-router';
import {
  useGetMovieDetailQuery,
  useGetMovieVideosQuery,
  useGetSimilarMoviesQuery,
} from '../features/apiSlice';
import MovieCarousels from '../components/MovieCarousels';

const MovieDetails = () => {
  const sampleArr = {
    adult: false,
    backdrop_path: '/deLWkOLZmBNkm8p16igfapQyqeq.jpg',
    belongs_to_collection: null,
    budget: 60000000,
    genres: [
      {
        id: 14,
        name: 'Fantasy',
      },
      {
        id: 12,
        name: 'Adventure',
      },
      {
        id: 28,
        name: 'Action',
      },
    ],
    homepage: 'https://www.netflix.com/title/80991090',
    id: 763215,
    imdb_id: 'tt13452446',
    original_language: 'en',
    original_title: 'Damsel',
    overview:
      "A young woman's marriage to a charming prince turns into a fierce fight for survival when she's offered up as a sacrifice to a fire-breathing dragon.",
    popularity: 2543.57,
    poster_path: '/sMp34cNKjIb18UBOCoAv4DpCxwY.jpg',
    production_companies: [
      {
        id: 121424,
        logo_path: '/laQkxRzl2PTQFHPKVUE54UM38sw.png',
        name: 'PCMA Productions',
        origin_country: 'US',
      },
      {
        id: 105052,
        logo_path: null,
        name: 'Roth-Kirschenbaum Films',
        origin_country: 'US',
      },
    ],
    production_countries: [
      {
        iso_3166_1: 'US',
        name: 'United States of America',
      },
    ],
    release_date: '2024-03-08',
    revenue: 5000,
    runtime: 110,
    spoken_languages: [
      {
        english_name: 'English',
        iso_639_1: 'en',
        name: 'English',
      },
    ],
    status: 'Released',
    tagline: 'This is not a fairytale.',
    title: 'Damsel',
    video: false,
    vote_average: 7.255,
    vote_count: 929,
  };
  const { movieId } = useParams();

  const { data: movieData, isSuccess } = useGetMovieDetailQuery(movieId);
  console.log(movieData);
  let movie;
  if (isSuccess) {
    movie = movieData;
    console.log(movie);
  }

  const { data: videoData, isSuccess: videoSuccess } =
    useGetMovieVideosQuery(movieId);

  let videoSrc;
  if (videoSuccess) {
    console.log(videoData);
    // check if an official trailer video exists
    const trailerVideo = videoData.results.filter((video) =>
      video.name.toLowerCase().includes('official trailer')
    )[0];
    // if it exists show the trailer video
    if (videoData.results.length < 1) {
      videoSrc = false;
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

  return (
    <div className='movie'>
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
          //if no video show the poster image 
        ) : movie && movie.poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt=''
          />
        ) : (
          <div>
            <h1>wahala</h1>
            <h1>wahala</h1>
            <h1>wahala</h1>
            <h1>wahala</h1>
          </div>
        )}
      </div>

      {movie && (
        <div className='movie-details'>
          <div className='title-details'>
            <h2>{movie.title}</h2>

            <p className='year'>{movie.release_date.split('-')[0]}</p>

            <div className='genres'>
              {movie.genres.map((genre) => (
                <p className='genre' key={genre.id}>
                  {genre.name}
                </p>
              ))}
            </div>
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
