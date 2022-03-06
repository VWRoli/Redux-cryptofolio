import {
  PieChart as RePieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from 'recharts';
import { useEffect, useState } from 'react';
import { calcPieChartData, capitalizeFirstLetter } from '../../helpers';
import { COLORS, RADIAN } from '../../constants/constant';
import { useSelector } from 'react-redux';
import { State } from '../../reducers';
import useWindowWidth from '../../hooks/useWindowWidth';

type Props = {
  clicked: boolean;
};

type DataType = {
  id: string;
  value: number;
};

type LabelProps = { [key: string]: number };

const PieChart: React.FC<Props> = ({ clicked }): JSX.Element => {
  const { assets, coinInfo } = useSelector((state: State) => state.asset);
  const [data, setData] = useState<DataType[]>([]);
  const width = useWindowWidth();
  const isMobileScreen = width < 600;

  useEffect(() => {
    setData(calcPieChartData(assets, coinInfo));
  }, [clicked, assets, coinInfo]);

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }: LabelProps) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 1.25;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="#222"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
      >
        {capitalizeFirstLetter(data[index].id)}
        <br /> {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <RePieChart>
        <Pie
          data={data}
          innerRadius={isMobileScreen ? 45 : 60}
          outerRadius={isMobileScreen ? 70 : 100}
          paddingAngle={5}
          dataKey="value"
          labelLine={false}
          label={renderCustomizedLabel}
        >
          {data.map((_: DataType, index: number) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </RePieChart>
    </ResponsiveContainer>
  );
};

export default PieChart;
