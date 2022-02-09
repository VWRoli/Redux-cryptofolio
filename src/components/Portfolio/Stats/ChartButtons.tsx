import { connect } from 'react-redux';
import { useState } from 'react';
import { setChartDays } from '../../../actions/assetActions';

type Props = {
  buttons: {
    label: string;
    days: string | number;
  }[];
  setChartDays: any;
};

const ChartButtons: React.FC<Props> = ({
  buttons,
  setChartDays,
}): JSX.Element => {
  const [active, setActive] = useState(1);

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

export default connect(null, { setChartDays })(ChartButtons);
