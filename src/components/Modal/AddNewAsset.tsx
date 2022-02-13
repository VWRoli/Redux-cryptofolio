import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { priceChangeFormatter, priceFormatter } from '../../helpers';
import { useFetch } from '../../useFetch';
import { addAsset } from '../../actions/assetActions';
import { openSuccess } from '../../actions/modalActions';
import { FaPlus } from 'react-icons/fa';
//Components
import Error from '../Error';
import Loading from '../Loading';
import { State } from '../../reducers';
import Button from '../common/Button/Button';

type Props = {
  id: string;
};

const AddNewAsset: React.FC<Props> = ({ id }): JSX.Element => {
  const dispatch = useDispatch();

  const defaultCurrency = useSelector(
    (state: State) => state.asset.defaultCurrency,
  );

  const { data, isLoading, isError } = useFetch(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${defaultCurrency}&ids=${id}`,
  );

  const [holdings, setHoldings] = useState('');

  if (!data[0]) return <></>;

  const { name, image, symbol, price_change_percentage_24h, current_price } =
    data[0];
  //todo disabled btn
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //Handle unfilled input field
    //todo better error handling
    // if (!holdings) {
    //   const target = document.querySelector('#holdings');
    //   console.log(
    //     (target?.parentNode as HTMLElement).querySelector('#holdings')
    //   );
    //   //e.target.querySelector('#holdings').placeholder =
    //   ('Please fill out the field!');
    //   //e.target.querySelector('#holdings').classList.add('input-error');
    //   return;
    // }
    dispatch(openSuccess());

    dispatch(addAsset({ id, holdings: +holdings }));
    setHoldings('');
  };

  if (isError) {
    return (
      <div id="add-new-asset">
        <h1>Add New Asset</h1>
        <Error />
      </div>
    );
  }

  return (
    <div id="add-new-asset">
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
            Current Price:{' '}
            <span>{priceFormatter(current_price, defaultCurrency)}</span>
          </h3>
          <form onSubmit={handleSubmit}>
            <label htmlFor="holdings">Quantity: </label>
            <input
              type="number"
              name="holdings"
              id="holdings"
              value={holdings}
              onChange={(e) => setHoldings(e.target.value)}
            />
            <Button
              label="Add Asset"
              primary
              icon={<FaPlus />}
              fullWidth
              submitHandler={handleSubmit}
            />
          </form>
        </>
      )}
    </div>
  );
};

export default AddNewAsset;
