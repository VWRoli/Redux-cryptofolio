import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { priceChangeFormatter, priceFormatter } from '../../helpers';
import { useFetch } from '../../useFetch';
import { editAsset } from '../../actions/assetActions';
import { openSuccess } from '../../actions/modalActions';
import { State } from '../../reducers';
import { FaEdit } from 'react-icons/fa';
//Components
import Error from '../Error';
import Loading from '../Loading';
import Button from '../common/Button/Button';

type Props = {
  id: string;
};

const EditAsset: React.FC<Props> = ({ id }): JSX.Element => {
  const dispatch = useDispatch();
  const { assets, defaultCurrency } = useSelector(
    (state: State) => state.asset,
  );

  const { data, isLoading, isError } = useFetch(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${defaultCurrency}&ids=${id}`,
  );

  const [correctCoin] = assets.filter((asset) => asset.id === id);

  const [holdings, setHoldings] = useState(correctCoin.holdings);

  if (!data[0]) return <></>;

  const { name, image, symbol, price_change_percentage_24h, current_price } =
    data[0];

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // //Handle unfilled input field
    // if (!holdings) {
    //   e.target.querySelector('#holdings').placeholder =
    //     'Please fill out the field!';
    //   e.target.querySelector('#holdings').classList.add('input-error');
    //   return;
    // }
    dispatch(openSuccess());

    //Edit holdings
    //correctCoin.holdings = +holdings;
    dispatch(editAsset(correctCoin, holdings));

    setHoldings(0);
  };

  if (isError) {
    return (
      <div id="edit-asset">
        <h1>Add New Asset</h1>
        <Error />
      </div>
    );
  }

  return (
    <div id="edit-asset">
      <h1>Edit Asset</h1>
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
            Current Price:{' '}
            <span>{priceFormatter(current_price, defaultCurrency)}</span>
          </h3>

          <div className="your-data">
            <h3>
              Your Holdings:{' '}
              <span>
                {correctCoin.holdings} <span>{symbol}</span>
              </span>
            </h3>
            <h3>
              Your Asset Value:{' '}
              <span>
                {priceFormatter(
                  current_price * correctCoin.holdings,
                  defaultCurrency,
                )}
              </span>
            </h3>
          </div>

          <form action="/" onSubmit={onSubmit}>
            <label htmlFor="holdings">Quantity: </label>
            <input
              type="number"
              name="holdings"
              id="holdings"
              value={holdings}
              onChange={(e) => setHoldings(+e.target.value)}
            />

            <Button label="Edit Asset" primary icon={<FaEdit />} />
          </form>
        </>
      )}
    </div>
  );
};

export default EditAsset;
