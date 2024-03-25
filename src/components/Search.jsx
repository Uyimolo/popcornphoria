import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useGetSearchResultQuery } from '../features/apiSlice';

const Search = () => {
  const [textToSearch, setTextToSearch] = useState('');

  const {
    data: searchData,
    isSuccess,
    isLoading,
  } = useGetSearchResultQuery(textToSearch);

  return (
    <div>
      <div className='search'>
        <input
          type='text'
          className='search-input'
          id='search-input'
          placeholder='Search'
          value={textToSearch}
          onChange={(e) => setTextToSearch(e.target.value)}
        />
        <FontAwesomeIcon className='search-icon awesome' icon={faSearch} />
      </div>

      <div className='search-results'></div>
    </div>
  );
};

export default Search;
