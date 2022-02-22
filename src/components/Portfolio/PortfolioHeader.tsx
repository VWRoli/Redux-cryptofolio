import { FaPlus } from 'react-icons/fa';
import { setSearchQuery } from '../../actions/assetActions';
//Components
import Button from '../common/Button/Button';
import Title from '../common/Title/Title';

const PortfolioHeader = () => {
  return (
    <header className="header">
      <div className="header-text">
        <Title title="Your portfolio" />
        <h3>Keep track of your Crypto Investments</h3>
      </div>
      <Button
        route="/addasset"
        primary
        label="Add Asset"
        icon={<FaPlus />}
        clickHandler={() => setSearchQuery('')}
      />
    </header>
  );
};

export default PortfolioHeader;
