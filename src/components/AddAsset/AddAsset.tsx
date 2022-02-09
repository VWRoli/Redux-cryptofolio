import { Link } from 'react-router-dom';

import AssetsList from './AssetsList';
import SearchBar from './SearchBar';

const AddAsset = () => {
  return (
    <section id="add-asset">
      <header className="header">
        <div className="header-text">
          <h1>Add New Asset</h1>
          <h3>Please Select or Search your Coin</h3>
        </div>
        <button type="button" className="primary-btn">
          <Link to="/portfolio">My Portfolio</Link>
        </button>
      </header>

      <SearchBar />
      <AssetsList />
    </section>
  );
};

export default AddAsset;
