import AssetsHeader from './AssetsHeader';
import { useGlobalContext } from '../../context';
import AssetsTable from './AssetsTable';
import { FaSyncAlt } from 'react-icons/fa';
import { useFetch } from '../../useFetch';

const Assets = () => {
  const {
    assets,
    clearAssets,
    fetchCoinInfo,
    setCurrency,
    defaultCurrency,
  } = useGlobalContext();

  const { data: currencies } = useFetch(
    `https://api.coingecko.com/api/v3/simple/supported_vs_currencies`
  );

  const handleChange = (e) => {
    setCurrency(e.target.value);
  };

  return (
    <section id="assets">
      <header className="assets-header">
        <h2 className="assets-title">Your Assets </h2>
        <form action="/">
          <label htmlFor="currency">Default Currency:</label>
          <select
            name="currency"
            id="currency"
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
        <FaSyncAlt className="refresh-btn" onClick={fetchCoinInfo} />
      </header>
      <table>
        <thead>
          <AssetsHeader />
        </thead>
        {assets.length === 0 ? (
          <tbody>
            <tr>
              <td className="empty-table" colSpan="6">
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
        <button type="button" className="clear-btn" onClick={clearAssets}>
          Clear Assets
        </button>
      )}
    </section>
  );
};

export default Assets;
