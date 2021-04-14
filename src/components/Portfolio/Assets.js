import { FaSyncAlt } from 'react-icons/fa';
import { useFetch } from '../../useFetch';
import { connect } from 'react-redux';
import {
  setCurrency,
  clearAssets,
  fetchCoinData,
} from '../../actions/assetActions';
import { CURRENCY_URL } from '../../constants/constant';
//Components
import AssetsHeader from './AssetsHeader';
import AssetsTable from './AssetsTable';

//todo fetchCoinInfo

const mapStateToProps = (state) => ({
  assets: state.asset.assets,
  defaultCurrency: state.asset.defaultCurrency,
});

const Assets = ({
  assets,
  defaultCurrency,
  setCurrency,
  fetchCoinData,
  clearAssets,
}) => {
  const { data: currencies } = useFetch(CURRENCY_URL);

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
        <FaSyncAlt className='refresh-btn' onClick={fetchCoinData} />
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

export default connect(mapStateToProps, {
  setCurrency,
  clearAssets,
  fetchCoinData,
})(Assets);
