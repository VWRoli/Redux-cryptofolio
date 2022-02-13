import { priceFormatter } from '../../helpers';

type Props = {
  price: number;
  cur: string;
};
const ShowPrice: React.FC<Props> = ({ price, cur }): JSX.Element => {
  return (
    <h3 className="show-price">
      Current Price: <span>{priceFormatter(price, cur)}</span>
    </h3>
  );
};

export default ShowPrice;
