import { FaSearch } from 'react-icons/fa';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchQuery } from '../../actions/assetActions';
//Components
import IconButton from '../common/IconButton/IconButton';

const SearchBar: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formatSearchTerm = searchTerm.toLowerCase().trim().replace(' ', '-');
    dispatch(setSearchQuery(formatSearchTerm));
  };

  return (
    <form id="search-form" onSubmit={onSubmit}>
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
      <IconButton primary icon={<FaSearch />} clickHandler={onSubmit} />
    </form>
  );
};

export default SearchBar;
