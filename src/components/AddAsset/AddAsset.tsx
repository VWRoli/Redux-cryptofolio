import { CgNotes } from 'react-icons/cg';
//Components
import AssetsList from './AssetsList';
import SearchBar from './SearchBar';
import Button from '../common/Button/Button';

const AddAsset: React.FC = (): JSX.Element => {
  return (
    <section id="add-asset">
      <header className="header">
        <div className="header-text">
          <h1>Add New Asset</h1>
          <h3>Please Select or Search your Coin</h3>
        </div>
        <Button
          route="/portfolio"
          label="My Portfolio"
          primary
          icon={<CgNotes />}
        />
      </header>
      <SearchBar />
      <AssetsList />
    </section>
  );
};

export default AddAsset;
