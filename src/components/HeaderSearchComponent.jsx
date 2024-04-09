import React, { useEffect, useState } from 'react';
import { useLazyGetSearchResultQuery } from '../features/apiSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faClose,
  faSearch,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import {
  setShowSearch,
  updateSearchResults,
  updateSearchTerm,
} from '../features/searchSlice';

const HeaderSearchComponent = ({ isSidebarOpen }) => {
  const [trigger, result] = useLazyGetSearchResultQuery();
  const [searchIcon, setSearchIcon] = useState(faSearch);
  const location = useLocation();
  const dispatch = useDispatch();
  const showSearchResult = useSelector((state) => state.search.showSearch);
  const searchTerm = useSelector((state) => state.search.searchTerm);

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
      dispatch(setShowSearch({ showSearch: true }));
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
    dispatch(setShowSearch({ showSearch: false }));
    dispatch(updateSearchTerm({ searchTerm: '' }));
  };

  return (
    <div className='inner-search-wrapper'>
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
                onInput={(e) =>
                  dispatch(updateSearchTerm({ searchTerm: e.target.value }))
                }
                onChange={(e) =>
                  dispatch(updateSearchTerm({ searchTerm: e.target.value }))
                }
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
