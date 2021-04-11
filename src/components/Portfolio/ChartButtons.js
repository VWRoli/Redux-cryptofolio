import { connect } from 'react-redux';
import { useState } from 'react';

const mapDispatchToProps = (dispatch) => {
  return {
    setChartDays: (day) => dispatch({ type: SET_DAYS, payload: day }),
  };
};

const ChartButtons = ({ buttons, setChartDays }) => {
  const [active, setActive] = useState(1);

  return (
    <div className='graph-btn-container'>
      {buttons.map((btn, i) => {
        return (
          <button
            key={i}
            type='button'
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

export default connect(null, mapDispatchToProps)(ChartButtons);
