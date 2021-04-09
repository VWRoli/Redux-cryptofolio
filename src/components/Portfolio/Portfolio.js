import Assets from './Assets';
import Stats from './Stats';
import { FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../../context';

const Portfolio = () => {
  const { setSearchQuery } = useGlobalContext();

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
