import {
  PieChart as RePieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from 'recharts';
import { useEffect, useState } from 'react';
import { calcPieChartData } from '../../../helpers';
import { COLORS, RADIAN } from '../../../constants/constant';
import { connect } from 'react-redux';
import { AssetType } from '../../../actions/assetActions';

const mapStateToProps = (state: any) => ({
  assets: state.asset.assets,
  coinInfo: state.asset.coinInfo,
});

type Props = {
  clicked: any;
  assets: AssetType[];
  coinInfo: any;
};

type LabelProps = { [key: string]: number };

const PieChart: React.FC<Props> = ({
  clicked,
  assets,
  coinInfo,
}): JSX.Element => {
  //todo
  const [data, setData] = useState<any>([]);

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
          {data.map((value: any, index: number) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </RePieChart>
    </ResponsiveContainer>
  );
};

export default connect(mapStateToProps)(PieChart);
