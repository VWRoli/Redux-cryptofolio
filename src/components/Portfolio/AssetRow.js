import { priceChangeFormatter, priceFormatter } from '../../helpers';
import { FaEdit, FaRegMinusSquare } from 'react-icons/fa';
import { connect } from 'react-redux';
import { openModal, openEditAsset } from '../../actions/modalActions';
import { removeAsset, setActiveCoin } from '../../actions/assetActions';

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
      <td>{priceFormatter(price, defaultCurrency)}</td>
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
        {priceFormatter(price * asset.holdings, defaultCurrency)} <br />
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
        {priceFormatter(changeValue * asset.holdings, defaultCurrency)}
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

export default connect(mapStateToProps, {
  openEditAsset,
  openModal,
  removeAsset,
  setActiveCoin,
})(AssetRow);
