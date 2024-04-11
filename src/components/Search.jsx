import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setShowSearch } from '../features/searchSlice';
import { useEffect, useRef, useState } from 'react';

const Search = ({}) => {
  const [searchResultCount, setSearchResultCount] = useState(0);
  const searchContainerRef = useRef();
  const searchResultList = useSelector((state) => state.search.searchResults);
  const searchTerm = useSelector((state) => state.search.searchTerm);

  const showSearchResult = useSelector((state) => state.search.showSearch);
  const dispatch = useDispatch();

  const handleCloseSearch = () => {
    dispatch(setShowSearch({ showSearch: false }));
  };

  useEffect(() => {
    searchContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    setSearchResultCount(
      searchResultList.filter((movie) => movie.backdrop_path).length
    );
  }, [searchResultList]);

  useEffect(() => {}, [showSearchResult]);

  return (
    <div
      className={`search-container ${showSearchResult ? 'active' : ''}`}
      ref={searchContainerRef}>
      {searchResultCount > 0 && searchTerm !== '' && (
        <p>{`${searchResultCount} ${
          searchResultCount === 1 ? 'result' : 'results'
        } found.`}</p>
      )}
      {searchResultList.length > 0 && searchTerm !== '' ? (
        <div className='search-results'>
          {searchResultList
            .filter((movie) => movie.backdrop_path)
            // .sort((a, b) => b.vote_average - a.vote_average)
            .map((data) => (
              <div className='search-result' key={data.id}>
                <Link
                  to={`/${data.media_type === 'movie' ? 'movie' : 'tv'}/${
                    data.id
                  }`}
                  onClick={handleCloseSearch}>
                  <img
                    src={`https://image.tmdb.org/t/p/w500${data.backdrop_path}`}
                    alt={data.name}
                  />
                </Link>

                <div className='search-result-details'>
                  <p className='title'>{data.title || data.name}</p>

                  {(data.release_date || data.first_air_date) && (
                    <p>{`${
                      data.media_type === 'movie' ? 'Movie' : 'TV show'
                    } | ${
                      data.release_date
                        ? data.release_date.split('-')[0]
                        : data.first_air_date.split('-')[0]
                    }`}</p>
                  )}

                  <div className='stars'>
                    <FontAwesomeIcon icon={faStar} className='awesome' />
                    <p>{`${
                      data.vote_average === 0
                        ? 'No ratings yet.'
                        : data.vote_average.toFixed(1)
                    }`}</p>
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
