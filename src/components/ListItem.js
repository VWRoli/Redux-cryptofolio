import { FaPlus } from 'react-icons/fa';
import { connect } from 'react-redux';
import { OPEN_MODAL, SET_ACTIVE_COIN } from '../constants/actionTypes';

const mapDispatchToProps = (dispatch) => {
  return {
    setActiveCoin: (id) => dispatch({ type: SET_ACTIVE_COIN, payload: id }),
    openModal: () => dispatch({ type: OPEN_MODAL }),
  };
};

const ListItem = ({ coin, owned, openModal, setActiveCoin }) => {
  const { name, symbol, image, id } = coin;
  return (
    <article
      className={owned ? 'list-item owned-coin' : 'list-item'}
      title={name}
    >
      <div className='img-wrapper'>
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
          type='button'
          className='add-btn'
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

export default connect(null, mapDispatchToProps)(ListItem);
