import { FaPlus } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { setActiveCoin } from '../actions/assetActions';
import { openModal } from '../actions/modalActions';
import { CoinType } from '../Types';
import IconButton from './common/IconButton/IconButton';

type Props = {
  coin: CoinType;
  owned?: boolean;
};

const ListItem: React.FC<Props> = ({ coin, owned }): JSX.Element => {
  const { name, symbol, image, id } = coin;
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setActiveCoin(id));
    dispatch(openModal());
  };

  return (
    <article
      className={owned ? 'list-item owned-coin' : 'list-item'}
      title={name}
    >
      <div className="img-wrapper">
        <img src={image} alt={name} />
      </div>
      <h2>
        {name.substring(0, 12)} <br />
        <span>{owned ? 'You already have this Coin' : symbol}</span>
      </h2>
      {owned ? (
        ''
      ) : (
        <IconButton primary clickHandler={handleClick} icon={<FaPlus />} />
      )}
    </article>
  );
};

export default ListItem;
