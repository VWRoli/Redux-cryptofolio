import { useDispatch, useSelector } from 'react-redux';
import { fetchCoinData } from '../../actions/assetActions';
import { useEffect } from 'react';
import { State } from '../../reducers';
//Components
import Assets from '../Assets/Assets';
import Stats from '../Stats/Stats';
import PageWrapper from '../common/PageWrapper/PageWrapper';
import PortfolioHeader from './PortfolioHeader';

const Portfolio: React.FC = (): JSX.Element => {
  const { chartDays, assets, defaultCurrency } = useSelector(
    (state: State) => state.asset,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCoinData());
  }, [chartDays, assets, defaultCurrency]);

  return (
    <PageWrapper>
      <section id="portfolio">
        <PortfolioHeader />
        <div className="container">
          <Stats />
          <Assets />
        </div>
      </section>
    </PageWrapper>
  );
};

export default Portfolio;
