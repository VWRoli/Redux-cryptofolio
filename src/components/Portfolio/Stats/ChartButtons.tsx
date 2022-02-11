import { useState } from 'react';
import { BUTTONS } from '../../../helpers';
import { setChartDays } from '../../../actions/assetActions';
import { useDispatch } from 'react-redux';

const ChartButtons: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const [active, setActive] = useState(1);

  return (
    <div className="graph-btn-container">
      {BUTTONS.map((btn, i) => {
        return (
          <button
            key={i}
            type="button"
            className={i === active ? 'chart-btn active' : 'chart-btn'}
            onClick={() => {
              setActive(i);
              dispatch(setChartDays(btn.days));
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
