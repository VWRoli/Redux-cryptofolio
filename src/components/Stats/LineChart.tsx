import {
  XAxis,
  YAxis,
  ResponsiveContainer,
  AreaChart,
  Tooltip,
  Area,
} from 'recharts';
import { priceFormatter } from '../../helpers';
import { useSelector } from 'react-redux';
//Components
import Loading from '../common/Loading/Loading';
import { State } from '../../reducers';

const LineChart: React.FC = (): JSX.Element => {
  const { isLoading, defaultCurrency, chartData } = useSelector(
    (state: State) => state.asset,
  );

  if (isLoading) {
    return (
      <div style={{ height: 300 }}>
        <Loading />
      </div>
    );
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
            tickFormatter={(tick) => {
              if (tick >= 1000 && tick < 1000000) return tick / 1000 + 'K ';
              else if (tick >= 1000000) return tick / 1000000 + 'M ';
              else return tick;
            }}
            unit={defaultCurrency.toUpperCase()}
          />

          <Tooltip
            formatter={(value: number) =>
              priceFormatter(value, defaultCurrency)
            }
          />
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

export default LineChart;
