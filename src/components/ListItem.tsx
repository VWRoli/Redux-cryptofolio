import { FaPlus } from 'react-icons/fa';
import { setActiveCoin } from '../actions/assetActions';
import { openModal } from '../actions/modalActions';
import { CoinType } from '../Types';

type Props = {
  coin: CoinType;
  owned?: boolean;
};

const ListItem: React.FC<Props> = ({ coin, owned }): JSX.Element => {
  const { name, symbol, image, id } = coin;

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
        <button
          type="button"
          className="add-btn"
          onClick={() => {
            setActiveCoin(id);
            openModal();
          }}
        >
          <FaPlus />
        </button>
      )}
    </article>
  );
};

export default ListItem;
