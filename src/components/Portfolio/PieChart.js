import {
  PieChart as RePieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from 'recharts';
import { useEffect, useState } from 'react';
import { calcPieChartData } from '../../helpers';
import { useGlobalContext } from '../../context';
import { COLORS, RADIAN } from '../../constant';

const PieChart = ({ clicked }) => {
  const { assets, coinInfo } = useGlobalContext();
  const [data, setData] = useState([]);

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
  }) => {
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
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </RePieChart>
    </ResponsiveContainer>
  );
};

export default PieChart;
