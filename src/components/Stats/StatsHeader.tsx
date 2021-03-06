import { useSelector } from 'react-redux';
import {
  calcChangePercentage,
  priceChangeFormatter,
  priceFormatter,
} from '../../helpers';
import { State } from '../../reducers';
//Components
import Skeleton from '../common/Skeleton/Skeleton';

const StatsHeader: React.FC = (): JSX.Element => {
  const { assets, isLoading, totalValue, totalValueChange, defaultCurrency } =
    useSelector((state: State) => state.asset);
  return (
    <div className="stats-header">
      {isLoading ? (
        <>
          <Skeleton height={40} width={60} />
          <Skeleton height={40} width={60} />
        </>
      ) : (
        <>
          <span className="stats-header_total-value">
            {priceFormatter(totalValue, defaultCurrency)}
          </span>
          {assets.length === 0 ? (
            <span style={{ fontSize: '1.5rem' }}>0%</span>
          ) : (
            <span className={totalValueChange > 0 ? 'positive' : 'negative'}>
              <span style={{ fontSize: '1.5rem', color: '#bbb' }}>24h: </span>
              {priceChangeFormatter(
                calcChangePercentage(totalValue, totalValueChange),
              )}
            </span>
          )}
        </>
      )}
    </div>
  );
};

export default StatsHeader;
