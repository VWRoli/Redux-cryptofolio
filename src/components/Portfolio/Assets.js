import { FaSyncAlt } from 'react-icons/fa';
import { useFetch } from '../../useFetch';
import { connect } from 'react-redux';
import { CLEAR_ASSETS, SET_CURRENCY } from '../../constants/actionTypes';
//Components
import AssetsHeader from './AssetsHeader';
import AssetsTable from './AssetsTable';

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrency: (currency) =>
      dispatch({ type: SET_CURRENCY, payload: currency }),
    clearAssets: () => dispatch({ type: CLEAR_ASSETS }),
    //fetchCoinInfo
  };
};

const mapStateToProps = (state) => ({
  assets: state.asset.assets,
  defaultCurrency: state.asset.defaultCurrency,
});

const Assets = ({
  assets,
  defaultCurrency,
  setCurrency,
  fetchCoinInfo,
  clearAssets,
}) => {
  const { data: currencies } = useFetch(
    `https://api.coingecko.com/api/v3/simple/supported_vs_currencies`
  );

  const handleChange = (e) => {
    setCurrency(e.target.value);
  };

  return (
    <section id='assets'>
      <header className='assets-header'>
        <h2 className='assets-title'>Your Assets </h2>
        <form action='/'>
          <label htmlFor='currency'>Default Currency:</label>
          <select
            name='currency'
            id='currency'
            value={defaultCurrency}
            onChange={handleChange}
          >
            {currencies.map((currency) => {
              return (
                <option key={currency} value={currency}>
                  {currency.toUpperCase()}
                </option>
              );
            })}
          </select>
        </form>
        <FaSyncAlt className='refresh-btn' onClick={fetchCoinInfo} />
      </header>
      <table>
        <thead>
          <AssetsHeader />
        </thead>
        {assets.length === 0 ? (
          <tbody>
            <tr>
              <td className='empty-table' colSpan='6'>
                You don't have any assets in your portfolio.
              </td>
            </tr>
          </tbody>
        ) : (
          <AssetsTable />
        )}
      </table>
      {assets.length === 0 ? (
        ''
      ) : (
        <button type='button' className='clear-btn' onClick={clearAssets}>
          Clear Assets
        </button>
      )}
    </section>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Assets);
