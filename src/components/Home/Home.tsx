import { IoMdCreate } from 'react-icons/io';
//Components
import Button from '../common/Button/Button';
import Title from '../common/Title/Title';
import HomeList from './HomeList';

const Home: React.FC = (): JSX.Element => {
  return (
    <section id="home">
      <div className="container">
        <div className="home-left">
          <Title title="Crypto Portfolio Tracker" />
          {/* <h1>Crypto Portfolio Tracker</h1> */}
          <h2>
            Keep track of your profits, losses and portfolio valuation with our
            easy to use platform.
          </h2>
          <div style={{ marginTop: '1.5rem' }}></div>
          <Button
            route="/portfolio"
            label="Create Your Portfolio"
            primary
            icon={<IoMdCreate />}
          />
        </div>
        <div className="home-right">
          <HomeList />
        </div>
      </div>
    </section>
  );
};

export default Home;
