import { CgNotes } from 'react-icons/cg';
//Components
import Button from '../common/Button/Button';
import Title from '../common/Title/Title';

const AddAssetHeader: React.FC = (): JSX.Element => {
  return (
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
  );
};

export default AddAssetHeader;
