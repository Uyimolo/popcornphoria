import { useParams } from 'react-router';

import {
  useGetSimilarTvShowsQuery,
  useGetTvShowDetailQuery,
  useGetTvShowVideosQuery,
  useGetTvShowCreditsQuery,
} from '../features/apiSlice';

import MovieCarousels from '../components/MovieCarousels';
import AddToWatchlist from '../components/AddToWatchlist';
import ShareMovie from '../components/ShareMovie';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const TvDetails = () => {
  const { tvId } = useParams();

  const { data: tvShowDetails, isSuccess: tvSuccess } =
    useGetTvShowDetailQuery(tvId);

  let tvShow;
  if (tvSuccess) {
    tvShow = tvShowDetails;
  }

  const { data: videoData, isSuccess: videoSuccess } =
    useGetTvShowVideosQuery(tvId);

  let videoSrc;

  if (videoSuccess) {
    // check if an official trailer video exists
    const trailerVideo = videoData.results.filter((video) =>
      video.name.toLowerCase().includes('official trailer')
    )[0];
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
  }

  const { data: similarTvShowData, isSuccess: similarTvShowSuccess } =
    useGetSimilarTvShowsQuery(tvId);

  let similarTvshows;
  if (similarTvShowSuccess) {
    similarTvshows = similarTvShowData.results;
  }

  const { data: creditsData, isSuccess: creditsSuccess } =
    useGetTvShowCreditsQuery(tvId);

  let credits;
  if (creditsSuccess) {
    credits = creditsData.cast.slice(0, 5).map((credit) => credit.name);
  }

  return (
    <div className='tv-show page'>
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
        tvShow && tvShow.backdrop_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w500${tvShow.backdrop_path}`}
            alt=''
          />
        ) : (
          <div className='spinner-center'>
            <FontAwesomeIcon className='awesome rotate ' icon={faSpinner} />
          </div>
        )}
      </div>

      {tvShow && (
        <div className='movie-details'>
          <div className='title-details'>
            <h2>{tvShow.name}</h2>

            <div className='share'>
              {' '}
              <p className='year'>{`${tvShow.first_air_date.split('-')[0]} | ${
                tvShow.number_of_seasons
              } ${
                tvShow.number_of_seasons < 2 ? 'season' : 'seasons'
              } | ${tvShow.vote_average.toFixed(1)} stars`}</p>
              <ShareMovie
                name={tvShow.name}
                link={`https://popcornphoria.vercel.app/tv/${tvShow.id}`}
              />
            </div>

            <div className='genres'>
              {tvShow.genres.map((genre) => (
                <p className='genre' key={genre.id}>
                  {genre.name}
                </p>
              ))}
            </div>

            {credits && <p>{`Starring: ${credits.join(' | ')}`}</p>}

            <div className='watchlist-button'>
              <AddToWatchlist
                poster_path={tvShow.poster_path}
                id={tvShow.id}
                media_type={'tv'}
                name={tvShow.name}
                year={tvShow.first_air_date.split('-')[0]}
              />
            </div>
          </div>

          <div className='story-line'>
            <h3>Story Line</h3>
            <p className='overview'>{tvShow.overview}</p>
          </div>

          {similarTvshows && (
            <div className='similar-tv-'>
              <MovieCarousels
                movieData={similarTvshows}
                carouselTitle='More like this'
                type='tv'
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TvDetails;
