import { useSelector } from 'react-redux';
import { useState } from 'react';
import { FaChartLine, FaChartPie } from 'react-icons/fa';
import { State } from '../../reducers';
//Components
import LineChartButtons from './LineChartButtons';
import Error from '../common/Error/Error';
import LineChart from './LineChart';
import PieChart from './PieChart';
import Title from '../common/Title/Title';
import Tab from '../common/Tab/Tab';
import StatsHeader from './StatsHeader';

const Stats: React.FC = (): JSX.Element => {
  const { isError } = useSelector((state: State) => state.asset);
  const [isLineChart, setIsLineChart] = useState(true);

  if (isError)
    return (
      <div className="stats-error-wrapper">
        <Error />
      </div>
    );

  return (
    <section id="stats">
      <Title h2 title="Overview" />

      <StatsHeader />
      <div className="chart-tab-container">
        <Tab
          label="Line Chart"
          icon={<FaChartLine />}
          clickHandler={() => setIsLineChart(true)}
        />
        <Tab
          label="Pie Chart"
          icon={<FaChartPie />}
          clickHandler={() => setIsLineChart(false)}
        />
      </div>

      {isLineChart ? <LineChart /> : <PieChart clicked={isLineChart} />}
      {isLineChart ? <LineChartButtons /> : <></>}
    </section>
  );
};

export default Stats;
