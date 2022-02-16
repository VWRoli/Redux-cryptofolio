import { useSelector } from 'react-redux';
import { useState } from 'react';
import { FaChartLine, FaChartPie } from 'react-icons/fa';
import { priceFormatter } from '../../../../helpers';
import {
  priceChangeFormatter,
  calcChangePercentage,
} from '../../../../helpers';
import ChartButtons from './ChartButtons';
//Components
import Loading from '../../../Loading';
import Error from '../../../Error';
import Chart from './LineChart';
import PieChart from './PieChart';
import { State } from '../../../../reducers';
import Title from '../../../common/Title/Title';

const Stats: React.FC = (): JSX.Element => {
  const {
    assets,
    isError,
    isLoading,
    totalValue,
    totalValueChange,
    defaultCurrency,
  } = useSelector((state: State) => state.asset);
  const [isLineChart, setIsLineChart] = useState(true);

  if (isError) return <Error />;

  return (
    <section id="stats">
      <Title h2 title="Overview" />

      {isLoading ? (
        <Loading />
      ) : (
        <div className="main-asset-value">
          {priceFormatter(totalValue, defaultCurrency)}
          {assets.length === 0 ? (
            <span>0%</span>
          ) : (
            <span className={totalValueChange > 0 ? 'positive' : 'negative'}>
              <span style={{ fontSize: '1.5rem', color: '#bbb' }}>24h: </span>
              {priceChangeFormatter(
                calcChangePercentage(totalValue, totalValueChange),
              )}
            </span>
          )}
        </div>
      )}
      <div className="chart-btn-container">
        <button className="chart-btn" onClick={() => setIsLineChart(true)}>
          <FaChartLine className="stat-btn-icon" /> Line Chart
        </button>
        <button className="chart-btn" onClick={() => setIsLineChart(false)}>
          <FaChartPie className="stat-btn-icon" /> Pie Chart
        </button>
      </div>

      {isLineChart ? <Chart /> : <PieChart clicked={isLineChart} />}
      {isLineChart ? <ChartButtons /> : ''}
    </section>
  );
};

export default Stats;
