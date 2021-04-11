import { priceChangeFormatter } from '../../helpers';
import { FaEdit, FaRegMinusSquare } from 'react-icons/fa';
import { connect } from 'react-redux';
import {
  OPEN_EDIT_ASSET,
  OPEN_MODAL,
  REMOVE_ASSET,
  SET_ACTIVE_COIN,
} from '../../constants/actionTypes';

const mapDispatchToProps = (dispatch) => {
  return {
    setActiveCoin: (id) => dispatch({ type: SET_ACTIVE_COIN, payload: id }),
    openModal: () => dispatch({ type: OPEN_MODAL }),
    openEditAsset: (id) => dispatch({ type: OPEN_EDIT_ASSET, payload: id }),
    removeAsset: (id) => dispatch({ type: REMOVE_ASSET, payload: id }),
  };
};

const mapStateToProps = (state) => ({
  coinInfo: state.asset.coinInfo,
  defaultCurrency: state.asset.defaultCurrency,
});

const AssetRow = ({
  asset,
  setActiveCoin,
  openModal,
  openEditAsset,
  removeAsset,
  coinInfo,
  defaultCurrency,
}) => {
  //todo
  //Price formatter
  const priceFormatter = (price) => {
    //Locale
    const locale = navigator.language;
    const formattedPrice = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: `${defaultCurrency}`,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
    return formattedPrice;
  };

  const [correctCoin] = coinInfo.filter((coin) => coin.id === asset.id);

  const {
    name,
    image,
    symbol,
    current_price: price,
    price_change_percentage_24h: changePercentage,
    price_change_24h: changeValue,
    id,
  } = correctCoin || {};

  if (!asset) return null;

  return (
    <tr>
      <td className='table-name'>
        <img src={image} alt={name} />
        <p>
          {name} <br /> <span className='symbol'>{symbol}</span>
        </p>
      </td>
      {/**PRICE */}
      <td>{priceFormatter(price)}</td>
      {/**PRICE CHANGE % */}
      <td
        className={
          changePercentage > 0
            ? 'positive percentage-change-row'
            : 'negative percentage-change-row'
        }
      >
        {priceChangeFormatter(changePercentage)}
      </td>
      {/**HOLDINGS */}
      <td className='holdings-row'>
        {priceFormatter(price * asset.holdings)} <br />
        <span className='holdings'>
          {asset.holdings?.toFixed(4)}
          <span className='symbol'>&nbsp;{symbol}</span>
        </span>
      </td>
      {/**PROFIT/LOSS */}
      <td
        className={
          changeValue > 0 ? 'profit-row positive' : 'profit-row negative'
        }
      >
        {priceFormatter(changeValue * asset.holdings)}
      </td>
      {/**ACTIONS */}
      <td className='actions-row'>
        <button
          type='button'
          className='edit-btn'
          onClick={() => {
            setActiveCoin(id);
            openModal();
            openEditAsset();
          }}
        >
          <FaEdit className='icons' title='Edit transaction' />
        </button>
        <button
          type='button'
          className='remove-btn'
          onClick={() => removeAsset(asset.id)}
        >
          <FaRegMinusSquare className='icons' title='Remove transaction' />
        </button>
      </td>
    </tr>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AssetRow);
