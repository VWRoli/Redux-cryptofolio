//Components
import AddAssetHeader from './AddAssetHeader';
import AssetsList from './AssetsList';
import SearchBar from './SearchBar';

const AddAsset: React.FC = (): JSX.Element => {
  return (
    <section id="add-asset">
      <AddAssetHeader />
      <SearchBar />
      <AssetsList />
    </section>
  );
};

export default AddAsset;
