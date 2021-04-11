import { useState } from 'react';
import { connect } from 'react-redux';
import {
  ADD_ASSET,
  CLOSE_MODAL,
  OPEN_SUCCESS,
} from '../../constants/actionTypes';
import { priceChangeFormatter } from '../../helpers';
import { useFetch } from '../../useFetch';
//Components
import Error from '../Error';
import Loading from '../Loading';

const mapStateToProps = (state) => ({
  defaultCurrency: state.asset.defaultCurrency,
});

const mapDispatchToProps = (dispatch) => {
  return {
    closeModal: () => dispatch({ type: CLOSE_MODAL }),
    addAsset: () => dispatch({ type: ADD_ASSET }),
    openSuccess: () => dispatch({ type: OPEN_SUCCESS }),
  };
};

const AddNewAsset = ({ id, addAsset, openSuccess, defaultCurrency }) => {
  const { data, isLoading, isError } = useFetch(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${defaultCurrency}&ids=${id}`
  );

  const [holdings, setHoldings] = useState('');

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

  if (!data[0]) return null;

  const {
    name,
    image,
    symbol,
    price_change_percentage_24h,
    current_price,
  } = data[0];

  const onSubmit = (e) => {
    e.preventDefault();

    //Handle unfilled input field
    if (!holdings) {
      e.target.querySelector('#holdings').placeholder =
        'Please fill out the field!';
      e.target.querySelector('#holdings').classList.add('input-error');
      return;
    }
    openSuccess();

    addAsset({ id, holdings: +holdings });
    setHoldings('');
  };

  if (isError) {
    return (
      <div id='add-new-asset'>
        <h1>Add New Asset</h1>
        <Error />
      </div>
    );
  }

  return (
    <div id='add-new-asset'>
      <h1>Add New Asset</h1>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <header>
            <img src={image} alt={name} />

            <h2>
              {name} <span>{symbol}</span>
            </h2>

            <p>
              24h:{' '}
              <span
                className={
                  price_change_percentage_24h > 0 ? 'positive' : 'negative'
                }
              >
                {priceChangeFormatter(price_change_percentage_24h)}
              </span>
            </p>
          </header>
          <h3>
            Current Price: <span>{priceFormatter(current_price)}</span>
          </h3>
          <form action='/' onSubmit={onSubmit}>
            <label htmlFor='holdings'>Quantity: </label>
            <input
              type='number'
              name='holdings'
              id='holdings'
              value={holdings}
              onChange={(e) => setHoldings(e.target.value)}
            />

            <button type='submit' className='primary-btn'>
              Add Asset
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AddNewAsset);
