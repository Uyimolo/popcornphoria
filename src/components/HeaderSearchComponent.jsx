import React, { useEffect, useState } from 'react';
import { useLazyGetSearchResultQuery } from '../features/apiSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useLocation, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { updateSearchResults } from '../features/searchSlice';

const HeaderSearchComponent = ({ isSidebarOpen }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [trigger, result] = useLazyGetSearchResultQuery();
  const [searchIcon, setSearchIcon] = useState(faSearch);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchResultState = useSelector((state) => state.search.searchResults);

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
      navigate('/search');
    }
  }, [result]);

  const handleSearch = () => {
    setSearchIcon(faSpinner);
    searchTerm.trim() !== '' && trigger(searchTerm.trim());
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
                onChange={(e) => setSearchTerm(e.target.value)}
              />

              <FontAwesomeIcon
                className={`search-icon awesome ${
                  searchIcon === faSpinner ? '' : ''
                }`}
                icon={searchIcon}
                onClick={() => setShowSearchInput((prevState) => !prevState)}
              />
            </div>

            <button className='search-button' onClick={handleSearch}>
              Search
            </button>
          </div>
        )}
    </div>
  );
};

export default HeaderSearchComponent;
