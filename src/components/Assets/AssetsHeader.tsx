import { FaSyncAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCoinData, setCurrency } from '../../actions/assetActions';
import { CURRENCY_URL } from '../../constants/constant';
import { State } from '../../reducers';
import { useFetch } from '../../useFetch';
//Components
import IconButton from '../common/IconButton/IconButton';
import Title from '../common/Title/Title';

const AssetsHeader = () => {
  const dispatch = useDispatch();

  const { data: currencies } = useFetch(CURRENCY_URL);

  const defaultCurrency = useSelector(
    (state: State) => state.asset.defaultCurrency,
  );

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setCurrency(e.target.value));
  };

  return (
    <header className="assets-header">
      <Title h2 title="Your Assets" />
      <form className="currrency-form" action="/">
        <label htmlFor="currency">Default Currency:</label>
        <select
          name="currency"
          id="currency"
          value={defaultCurrency}
          onChange={handleChange}
        >
          {currencies.map((currency: string) => {
            return (
              <option key={currency} value={currency}>
                {currency.toUpperCase()}
              </option>
            );
          })}
        </select>
      </form>
      <IconButton
        icon={<FaSyncAlt />}
        clickHandler={() => dispatch(fetchCoinData())}
      />
    </header>
  );
};

export default AssetsHeader;
