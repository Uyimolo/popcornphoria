import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect } from 'react';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateSearchResults } from '../features/searchSlice';

const Search = () => {
  const [showSearchInput, setShowSearchInput] = useState(false);
  const dispatch = useDispatch();
  const searchResultList = useSelector((state) => state.search.searchResults);

  useEffect(() => {
    searchResultList.length > 0
      ? setShowSearchInput(true)
      : setShowSearchInput(false);
  }, [searchResultList]);

  const handleClearSearch = () => {
    dispatch(updateSearchResults({ searchResults: [] }));
  };

  return (
    <div className={`search-container ${showSearchInput ? 'active' : ''}`}>
      {searchResultList.length > 0 ? (
        <div className='search-results'>
          {searchResultList.length > 0 && (
            <FontAwesomeIcon
              icon={faClose}
              className='awesome close-search'
              onClick={handleClearSearch}
            />
          )}

          {searchResultList.map((data) => (
            <div className='search-result' key={data.id}>
              <Link
                // onClick={handleClearSearch}
                to={`/${data.media_type === 'movie' ? 'movie' : 'tv'}/${
                  data.id
                }`}>
                <img
                  src={`https://image.tmdb.org/t/p/w92${data.poster_path}`}
                  alt=''
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
        <p className='result-list-placeholder'>Nothing to see here</p>
      )}
    </div>
  );
};

export default Search;
