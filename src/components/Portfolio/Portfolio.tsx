import { FaPlus } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { fetchCoinData, setSearchQuery } from '../../actions/assetActions';
import Button from '../common/Button/Button';
import Title from '../common/Title/Title';
//Components
import Assets from './Assets/Assets';
import Stats from './Assets/Stats/Stats';

const Portfolio: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();
  dispatch(fetchCoinData());

  return (
    <section id="portfolio">
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
      <div className="container">
        <Stats />
        <Assets />
      </div>
    </section>
  );
};

export default Portfolio;
