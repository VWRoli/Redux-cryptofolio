import { FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchCoinData, setSearchQuery } from '../../actions/assetActions';
//Components
import Assets from './Assets/Assets';
import Stats from './Stats/Stats';

const mapStateToProps = (state: any) => ({
  defaultCurrency: state.asset.defaultCurrency,
  assets: state.asset.assets,
  chartDays: state.asset.chartDays,
});

type Props = {
  setSearchQuery: any;
  fetchCoinData: any;
};

const Portfolio: React.FC<Props> = ({
  setSearchQuery,
  fetchCoinData,
}): JSX.Element => {
  fetchCoinData();

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

export default connect(mapStateToProps, { fetchCoinData, setSearchQuery })(
  Portfolio
);
