import { FaPlus } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCoinData, setSearchQuery } from '../../actions/assetActions';
import { useEffect } from 'react';
import { State } from '../../reducers';
//Components
import Button from '../common/Button/Button';
import Title from '../common/Title/Title';
import Assets from '../Assets/Assets';
import Stats from '../Stats/Stats';
import PageWrapper from '../common/PageWrapper/PageWrapper';

const Portfolio: React.FC = (): JSX.Element => {
  const { chartDays, assets } = useSelector((state: State) => state.asset);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCoinData());
  }, [chartDays, assets]);

  return (
    <PageWrapper>
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
    </PageWrapper>
  );
};

export default Portfolio;
