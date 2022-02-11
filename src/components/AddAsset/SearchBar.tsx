import { FaSearch } from 'react-icons/fa';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchQuery } from '../../actions/assetActions';

const SearchBar: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formatSearchTerm = searchTerm.toLowerCase().trim().replace(' ', '-');
    dispatch(setSearchQuery(formatSearchTerm));
  };

  return (
    <section id="search-section">
      <form onSubmit={onSubmit}>
        <label htmlFor="search">Search your Coin: </label>
        <input
          type="text"
          name="search"
          id="search"
          value={searchTerm}
          onChange={(e) => {
            if (e.target.value === '') dispatch(setSearchQuery(e.target.value));
            setSearchTerm(e.target.value);
          }}
        />
        <button type="submit" className="search-btn">
          <FaSearch />
        </button>
      </form>
    </section>
  );
};

export default SearchBar;
