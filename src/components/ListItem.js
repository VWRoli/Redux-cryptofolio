import { FaPlus } from 'react-icons/fa';
import { useGlobalContext } from '../context';

const ListItem = ({ coin, owned }) => {
  const { openModal, setActiveCoin } = useGlobalContext();

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
