import { CgNotes } from 'react-icons/cg';
//Components
import AssetsList from './AssetsList';
import SearchBar from './SearchBar';
import Button from '../common/Button/Button';
import Title from '../common/Title/Title';

const AddAsset: React.FC = (): JSX.Element => {
  return (
    <section id="add-asset">
      <header className="header">
        <div className="header-text">
          <Title title="Add New Asset" />
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
