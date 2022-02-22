//Components
import PageWrapper from '../common/PageWrapper/PageWrapper';
import AddAssetHeader from './AddAssetHeader';
import AssetsList from './AssetsList';
import SearchBar from './SearchBar';

const AddAsset: React.FC = (): JSX.Element => {
  return (
    <PageWrapper>
      <section id="add-asset">
        <AddAssetHeader />
        <SearchBar />
        <AssetsList />
      </section>
    </PageWrapper>
  );
};

export default AddAsset;
