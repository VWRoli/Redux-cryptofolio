import {
  XAxis,
  YAxis,
  ResponsiveContainer,
  AreaChart,
  Tooltip,
  Area,
} from 'recharts';
import { connect } from 'react-redux';
import Loading from '../Loading';

const mapStateToProps = (state) => ({
  isLoading: state.asset.isLoading,
  defaultCurrency: state.asset.defaultCurrency,
  chartData: state.chart.chartData,
});

const Chart = ({ chartData, isLoading, defaultCurrency }) => {
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

  //Loading screen
  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <ResponsiveContainer width='100%' height={300}>
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id='priceGradient' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='5%' stopColor='#82ca9d' stopOpacity={0.8} />
              <stop offset='95%' stopColor='#82ca9d' stopOpacity={0.2} />
            </linearGradient>
          </defs>
          <XAxis dataKey='day' tick={false} />
          <YAxis
            width={80}
            dataKey='price'
            unit={defaultCurrency.toUpperCase()}
          />

          <Tooltip formatter={(value) => priceFormatter(value)} />
          <Area
            type='monotone'
            dataKey='price'
            stroke='green'
            fillOpacity={1}
            fill='url(#priceGradient)'
          />
        </AreaChart>
      </ResponsiveContainer>
    </>
  );
};

export default connect(mapStateToProps)(Chart);
