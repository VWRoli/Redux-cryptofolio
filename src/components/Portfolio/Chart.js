import {
  XAxis,
  YAxis,
  ResponsiveContainer,
  AreaChart,
  Tooltip,
  Area,
} from 'recharts';

import Loading from '../Loading';
import { useGlobalContext } from '../../context';

const Chart = () => {
  const {
    chartData,
    isLoading,
    defaultCurrency,
    priceFormatter,
  } = useGlobalContext();

  //Loading screen
  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0.2} />
            </linearGradient>
          </defs>
          <XAxis dataKey="day" tick={false} />
          <YAxis
            width={80}
            dataKey="price"
            unit={defaultCurrency.toUpperCase()}
          />

          <Tooltip formatter={(value) => priceFormatter(value)} />
          <Area
            type="monotone"
            dataKey="price"
            stroke="green"
            fillOpacity={1}
            fill="url(#priceGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </>
  );
};

export default Chart;
