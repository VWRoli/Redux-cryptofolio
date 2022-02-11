import { FaPlus } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCoinData, setSearchQuery } from '../../actions/assetActions';
//Components
import Assets from './Assets/Assets';
import Stats from './Stats/Stats';

const Portfolio: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();
  dispatch(fetchCoinData());

  return (
    <section id="portfolio">
      <header className="header">
        <div className="header-text">
          <h1>Your portfolio</h1>
          <h3>Keep track of your Crypto Investments</h3>
        </div>
        <button
          type="button"
          className="primary-btn"
          onClick={() => setSearchQuery('')}
        >
          <Link to="/addasset">
            <FaPlus /> Add Asset
          </Link>
        </button>
      </header>
      <div className="container">
        <Stats />
        <Assets />
      </div>
    </section>
  );
};

export default Portfolio;
