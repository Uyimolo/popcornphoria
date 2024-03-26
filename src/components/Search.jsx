import { faClose, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRef, useState } from 'react';
import { useLazyGetSearchResultQuery } from '../features/apiSlice';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';

const Search = ({ showSearchInput, setShowSearchInput }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const searchContainer = useRef();

  const [trigger, result, lastPromiseInfo] = useLazyGetSearchResultQuery();

  const { data, isError, isLoading, isFetching, isSuccess } = result;

  const handleSearch = () => {
    searchTerm.trim() !== '' && trigger(searchTerm.trim());
    searchContainer.current.scrollTo({ top: 0, behavior: 'smooth' });
  };
  let searchResultList;

  if (isSuccess) {
    searchResultList = data.results.filter(
      (data) =>
        data.poster_path !== null &&
        (data.media_type === 'movie' || data.media_type === 'tv')
    );
  }

  const handleCloseSearch = () => {
    if (isSuccess) searchResultList = [];
    trigger('');
    setShowSearchInput((prevState) => !prevState);
    setSearchTerm('');
    console.log(searchResultList);
  };

  return (
    <div className={`search-container ${showSearchInput ? 'active' : ''}`}>
      <div className='search'>
        <input
          type='text'
          className='search-input'
          id='search-input'
          placeholder='Search Movies and TV shows'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <button className='search-button' onClick={handleSearch}>
          Search
        </button>
      </div>

      {searchResultList && searchResultList.length !== 0 && (
        <div className='search-results' ref={searchContainer}>
          <FontAwesomeIcon
            icon={faClose}
            className='awesome close-search'
            onClick={handleCloseSearch}
          />

          {searchResultList.map((data) => (
            <div className='search-result' key={data.id}>
              <Link onClick={(handleCloseSearch)}
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
      )}
    </div>
  );
};

export default Search;
