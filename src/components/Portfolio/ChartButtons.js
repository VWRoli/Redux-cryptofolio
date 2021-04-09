import { useGlobalContext } from '../../context';
import { useState } from 'react';

const ChartButtons = ({ buttons }) => {
  const [active, setActive] = useState(1);

  const { setChartDays } = useGlobalContext();
  return (
    <div className="graph-btn-container">
      {buttons.map((btn, i) => {
        return (
          <button
            key={i}
            type="button"
            className={i === active ? 'chart-btn active' : 'chart-btn'}
            onClick={() => {
              setActive(i);
              setChartDays(btn.days);
            }}
          >
            {btn.label}
          </button>
        );
      })}
    </div>
  );
};

export default ChartButtons;
