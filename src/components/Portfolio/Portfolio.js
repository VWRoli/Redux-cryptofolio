import { FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  DISPLAY_INFO,
  GET_TOTALS,
  GET_TOTAL_CHANGE,
  LOADING,
  SET_CHART_DATA,
  SET_ERROR,
  SET_QUERY,
} from '../../constants/actionTypes';
import { useCallback, useEffect } from 'react';
import { chartDataFormatter, urlFormatter } from '../../helpers';
//Components
import Assets from './Assets';
import Stats from './Stats';

const mapStateToProps = (state) => ({
  defaultCurrency: state.asset.defaultCurrency,
  assets: state.asset.assets,
  totalValue: state.asset.totalValue,
  totalValueChange: state.asset.totalValueChange,
  chartDays: state.chart.chartDays,
});

const mapDispatchToProps = (dispatch) => {
  return {
    setSearchQuery: (query) => dispatch({ type: SET_QUERY, payload: query }),
    setLoading: () => dispatch({ type: LOADING }),
    setIsError: () => dispatch({ type: SET_ERROR }),
    displayInfo: (coinInfo) =>
      dispatch({ type: DISPLAY_INFO, payload: coinInfo }),
    getTotal: () => dispatch({ type: GET_TOTALS }),
    getTotalChange: () => dispatch({ type: GET_TOTAL_CHANGE }),
    setChartData: (chartData) =>
      dispatch({ type: SET_CHART_DATA, payload: chartData }),
  };
};

const Portfolio = ({
  setSearchQuery,
  setLoading,
  setIsError,
  displayInfo,
  defaultCurrency,
  assets,
  chartDays,
  setChartData,
  getTotal,
  getTotalChange,
}) => {
  //Fetch coin data
  const fetchCoinInfo = useCallback(async () => {
    try {
      setLoading();
      const formattedUrl = urlFormatter(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${defaultCurrency}&ids=`,
        assets
      );

      const response = await fetch(`${formattedUrl}`);
      const coinInfo = await response.json();

      displayInfo(coinInfo);
      //  Get API urls for chart
      const chartUrls = assets.map(
        (item) =>
          `https://api.coingecko.com/api/v3/coins/${item.id}/market_chart?vs_currency=${defaultCurrency}&days=${chartDays}`
      );
      //Fetch chart data
      const chartRes = await Promise.all(
        chartUrls.map((url) => fetch(url).catch((error) => error))
      );
      const chartData = await Promise.all(
        chartRes.map((response) =>
          response.json ? response.json().catch((error) => error) : response
        )
      );

      // Set chart data
      setChartData(chartDataFormatter(chartData, assets));

      //Get total asset values
      getTotal();

      //Get total value change
      getTotalChange();
    } catch (error) {
      console.log(error);
      setIsError();
    }
  }, [
    defaultCurrency,
    assets,
    displayInfo,
    setIsError,
    setLoading,
    chartDays,
    getTotal,
    getTotalChange,
    setChartData,
  ]);

  useEffect(() => {
    fetchCoinInfo();
  }, [fetchCoinInfo]);

  return (
    <section id='portfolio'>
      <header className='header'>
        <div className='header-text'>
          <h1>Your portfolio</h1>
          <h3>Keep track of your Crypto Investments</h3>
        </div>
        <button
          type='button'
          className='primary-btn'
          onClick={() => setSearchQuery('')}
        >
          <Link to='/addasset'>
            <FaPlus /> Add Asset
          </Link>
        </button>
      </header>
      <div className='container'>
        <Stats />
        <Assets />
      </div>
    </section>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio);
