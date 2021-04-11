import { FaSearch } from 'react-icons/fa';
import { useState } from 'react';
import { connect } from 'react-redux';
import { SET_QUERY } from '../../constants/actionTypes';

const mapDispatchToProps = (dispatch) => {
  return {
    setSearchQuery: (query) => dispatch({ type: SET_QUERY, payload: query }),
  };
};

const SearchBar = ({ setSearchQuery }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const formatSearchTerm = searchTerm.toLowerCase().trim().replace(' ', '-');
    setSearchQuery(formatSearchTerm);
  };

  return (
    <section id='search-section'>
      <form action='/' method='get' onSubmit={handleSubmit}>
        <label htmlFor='search'>Search your Coin: </label>
        <input
          type='text'
          name='search'
          id='search'
          value={searchTerm}
          onChange={(e) => {
            if (e.target.value === '') setSearchQuery(e.target.value);

            setSearchTerm(e.target.value);
          }}
        />
        <button type='submit' className='search-btn'>
          <FaSearch />
        </button>
      </form>
    </section>
  );
};

export default connect(null, mapDispatchToProps)(SearchBar);
