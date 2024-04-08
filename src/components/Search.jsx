import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { setShowSearch } from '../features/searchSlice';
import { useEffect, useRef } from 'react';

const Search = ({}) => {
  const searchContainerRef = useRef();
  const searchResultList = useSelector((state) => state.search.searchResults);

  const showSearchResult = useSelector((state) => state.search.showSearch);

  const handleCloseSearch = () => {
    dispatch(setShowSearch({ showSearch: false }));
  };

  useEffect(() => {
    searchContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    console.log(searchResultList);
  }, [searchResultList]);

  useEffect(() => {
    console.log(showSearchResult);
  }, [showSearchResult]);

  return (
    <div
      className={`search-container ${showSearchResult ? 'active' : ''}`}
      ref={searchContainerRef}>
      {searchResultList.length > 0 ? (
        <div className='search-results'>
          {searchResultList.map((data) => (
            <div className='search-result' key={data.id}>
              <Link
                to={`/${data.media_type === 'movie' ? 'movie' : 'tv'}/${
                  data.id
                }`}
                onClick={handleCloseSearch}>
                <img
                  src={`https://image.tmdb.org/t/p/w92${data.poster_path}`}
                  alt={data.name}
                />
              </Link>

              <div className='search-result-details'>
                <p className='title'>{data.title ? data.title : data.name}</p>

                {data.release_date && <p>{data.release_date.split('-')[0]}</p>}

                {data.first_air_date && (
                  <p>{data.first_air_date.split('-')[0]}</p>
                )}

                <p>{data.media_type === 'movie' ? 'Movie' : 'TV show'}</p>

                <div className='stars'>
                  <FontAwesomeIcon icon={faStar} className='awesome' />
                  <p>{data.vote_average.toFixed(1)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Match not found</p>
      )}
    </div>
  );
};

export default Search;
