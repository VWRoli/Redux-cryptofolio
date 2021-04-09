import { priceChangeFormatter, calcChangePercentage } from '../../helpers';
import { useState } from 'react';
import { FaChartLine, FaChartPie } from 'react-icons/fa';
import { BUTTONS } from '../../constants/constant';
//Components
import ChartButtons from './ChartButtons';
import Error from '../Error';
import Loading from '../Loading';
import Chart from './Chart';
import PieChart from './PieChart';

const Stats = () => {
  const [isLineChart, setIsLineChart] = useState(true);

  /* const {
    totalValue,
    isLoading,
    isError,
    totalValueChange,
    assets,
    priceFormatter,
  } = useGlobalContext(); */

  if (isError) return <Error />;

  return (
    <section id='stats'>
      <h2>Overview</h2>

      {isLoading ? (
        <Loading />
      ) : (
        <div className='main-asset-value'>
          {priceFormatter(totalValue)}
          {assets.length === 0 ? (
            <span>0%</span>
          ) : (
            <span className={totalValueChange > 0 ? 'positive' : 'negative'}>
              <span style={{ fontSize: '1.5rem', color: '#bbb' }}>24h: </span>
              {priceChangeFormatter(
                calcChangePercentage(totalValue, totalValueChange)
              )}
            </span>
          )}
        </div>
      )}
      <div className='chart-btn-container'>
        <button className='chart-btn' onClick={() => setIsLineChart(true)}>
          <FaChartLine className='stat-btn-icon' /> Line Chart
        </button>
        <button className='chart-btn' onClick={() => setIsLineChart(false)}>
          <FaChartPie className='stat-btn-icon' /> Pie Chart
        </button>
      </div>

      {isLineChart ? <Chart /> : <PieChart clicked={isLineChart} />}
      {isLineChart ? <ChartButtons buttons={BUTTONS} /> : ''}
    </section>
  );
};

export default Stats;
