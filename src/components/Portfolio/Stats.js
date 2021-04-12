import { connect } from 'react-redux';
import { useState, useEffect, useCallback } from 'react';
import { FaChartLine, FaChartPie } from 'react-icons/fa';
import { BUTTONS, chartDataFormatter } from '../../helpers';
import { priceChangeFormatter, calcChangePercentage } from '../../helpers';
//Components
import Loading from '../Loading';
import Error from '../Error';
import Chart from './Chart';
import PieChart from './PieChart';
import ChartButtons from './ChartButtons';
import {
  GET_TOTALS,
  GET_TOTAL_CHANGE,
  LOADING,
  SET_CHART_DATA,
  SET_ERROR,
} from '../../constants/actionTypes';

const mapStateToProps = (state) => ({
  assets: state.asset.assets,
  isLoading: state.asset.isLoading,
  isError: state.asset.isError,
  totalValue: state.asset.totalValue,
  totalValueChange: state.asset.totalValueChange,
  defaultCurrency: state.asset.defaultCurrency,
  chartDays: state.chart.chartDays,
});

const mapDispatchToProps = (dispatch) => {
  return {
    setLoading: () => dispatch({ type: LOADING }),
    setIsError: () => dispatch({ type: SET_ERROR }),
    getTotal: () => dispatch({ type: GET_TOTALS }),
    getTotalChange: () => dispatch({ type: GET_TOTAL_CHANGE }),
    setChartData: (chartData) =>
      dispatch({ type: SET_CHART_DATA, payload: chartData }),
  };
};

const Stats = ({
  assets,
  isError,
  isLoading,
  totalValue,
  totalValueChange,
  defaultCurrency,
  chartDays,
  setIsError,
  setLoading,
  setChartData,
  getTotal,
  getTotalChange,
}) => {
  const [isLineChart, setIsLineChart] = useState(true);

  // const fetchChartData = useCallback(async () => {
  //   try {
  //     //setLoading();
  //     //Get API urls for chart
  //     const chartUrls = assets.map(
  //       (item) =>
  //         `https://api.coingecko.com/api/v3/coins/${item.id}/market_chart?vs_currency=${defaultCurrency}&days=${chartDays}`
  //     );
  //     //Fetch chart data
  //     const chartRes = await Promise.all(
  //       chartUrls.map((url) => fetch(url).catch((error) => error))
  //     );
  //     const chartData = await Promise.all(
  //       chartRes.map((response) =>
  //         response.json ? response.json().catch((error) => error) : response
  //       )
  //     );

  //     // Set chart data
  //     setChartData(chartDataFormatter(chartData, assets));

  //     //Get total asset values
  //     getTotal();

  //     //Get total value change
  //     getTotalChange();
  //   } catch (error) {
  //     setIsError();
  //   }
  // }, [
  //   defaultCurrency,
  //   assets,
  //   chartDays,
  //   setChartData,
  //   setIsError,
  //   setLoading,
  //   getTotal,
  //   getTotalChange,
  // ]);

  // useEffect(() => {
  //   fetchChartData();
  // }, [fetchChartData]);

  //todo
  //Price formatter
  const priceFormatter = (price) => {
    //Locale
    const locale = navigator.language;
    const formattedPrice = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: `${defaultCurrency}`,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
    return formattedPrice;
  };

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

export default connect(mapStateToProps, mapDispatchToProps)(Stats);
