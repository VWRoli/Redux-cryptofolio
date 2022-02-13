import { useSelector } from 'react-redux';
import { priceFormatter } from '../../helpers';
import { State } from '../../reducers';
import { CoinType } from '../../Types';

type Props = {
  props: CoinType;
  id: string;
};

const UserAssetData: React.FC<Props> = ({ props, id }): JSX.Element => {
  const { symbol, current_price } = props;
  const { assets, defaultCurrency } = useSelector(
    (state: State) => state.asset,
  );
  const [correctCoin] = assets.filter((asset) => asset.id === id);

  return (
    <div className="user-data">
      <h3>
        Your Holdings:{' '}
        <span>
          {correctCoin?.holdings} <span>{symbol}</span>
        </span>
      </h3>
      <h3>
        Your Asset Value:{' '}
        <span>
          {priceFormatter(
            current_price * correctCoin?.holdings,
            defaultCurrency,
          )}
        </span>
      </h3>
    </div>
  );
};

export default UserAssetData;
