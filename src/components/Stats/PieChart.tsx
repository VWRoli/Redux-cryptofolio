import {
  PieChart as RePieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from 'recharts';
import { useEffect, useState } from 'react';
import { calcPieChartData } from '../../helpers';
import { COLORS, RADIAN } from '../../constants/constant';
import { useSelector } from 'react-redux';
import { State } from '../../reducers';

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
    const radius: number = innerRadius + (outerRadius - innerRadius) * 1.25;
    const x: number = cx + radius * Math.cos(-midAngle * RADIAN);
    const y: number = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="#222"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
      >
        {data[index].id}
        <br /> {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <RePieChart>
        <Pie
          data={data}
          innerRadius={60}
          outerRadius={100}
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
