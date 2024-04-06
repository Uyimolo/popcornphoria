import React, { useEffect, useState } from 'react';
import { useLazyGetSearchResultQuery } from '../features/apiSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faClose,
  faSearch,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router';
import { useDispatch } from 'react-redux';
import { updateSearchResults } from '../features/searchSlice';

const HeaderSearchComponent = ({
  isSidebarOpen,
  setShowSearchResult,
  showSearchResult,
  setSearchTerm,
  searchTerm,
}) => {
  const [trigger, result] = useLazyGetSearchResultQuery();
  const [searchIcon, setSearchIcon] = useState(faSearch);
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const { data, isSuccess, isError, error } = result;
    if (isSuccess) {
      const searchResultList = data.results.filter(
        (data) =>
          data.poster_path !== null &&
          (data.media_type === 'movie' || data.media_type === 'tv')
      );

      dispatch(updateSearchResults({ searchResults: searchResultList }));
      setSearchIcon(faSearch);
      setShowSearchResult(true);
    }
  }, [result]);

  useEffect(() => {
    if (searchTerm.trim() !== '') {
      handleSearch();
    }
  }, [searchTerm]);

  const handleSearch = () => {
    if (searchTerm.trim() !== '') {
      setSearchIcon(faSpinner);
      trigger(searchTerm.trim());
    }
  };

  const handleClearSearch = () => {
    dispatch(updateSearchResults({ searchResults: [] }));
    setShowSearchResult(false);
    setSearchTerm('');
  };

  return (
    <div className=''>
      {!location.pathname.includes('/signup') &&
        !location.pathname.includes('/login') &&
        !isSidebarOpen && (
          <div className='search'>
            <div className='input-icon-container'>
              <input
                type='text'
                className='search-input'
                id='search-input'
                placeholder='Search movies and TV shows'
                value={searchTerm}
                onInput={(e) => setSearchTerm(e.target.value)}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />

              <FontAwesomeIcon
                className={`search-icon awesome ${
                  searchIcon === faSpinner ? 'rotate' : ''
                }`}
                icon={searchIcon}
              />

              {showSearchResult && (
                <FontAwesomeIcon
                  className='close-search awesome'
                  icon={faClose}
                  onClick={handleClearSearch}
                />
              )}
            </div>
          </div>
        )}
    </div>
  );
};

export default HeaderSearchComponent;
