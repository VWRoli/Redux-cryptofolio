import { useState } from 'react';
import { BUTTONS } from '../../helpers';
import { setChartDays } from '../../actions/assetActions';
import { useDispatch } from 'react-redux';
//Components
import Button from '../common/Button/Button';

const LineChartButtons: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const [active, setActive] = useState(1);

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      {BUTTONS.map((btn, i) => {
        return (
          <Button
            key={i}
            active={i === active}
            clickHandler={() => {
              setActive(i);
              dispatch(setChartDays(btn.days));
            }}
            label={btn.label}
          />
        );
      })}
    </div>
  );
};

export default LineChartButtons;
