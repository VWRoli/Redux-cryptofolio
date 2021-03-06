import { priceChangeFormatter } from '../../helpers';
import { CoinType } from '../../Types';
import Title from '../common/Title/Title';

type Props = {
  props: CoinType;
};
const AssetInfo: React.FC<Props> = ({ props }): JSX.Element => {
  const { name, image, symbol, price_change_percentage_24h } = props;

  return (
    <div className="asset-info">
      <img src={image} alt={name} />

      <Title title={name} h2>
        <span>{symbol}</span>
      </Title>

      <p>
        24h:{' '}
        <span
          className={price_change_percentage_24h > 0 ? 'positive' : 'negative'}
        >
          {priceChangeFormatter(price_change_percentage_24h)}
        </span>
      </p>
    </div>
  );
};

export default AssetInfo;
