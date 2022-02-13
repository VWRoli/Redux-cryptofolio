import { useState } from 'react';
import { useSelector } from 'react-redux';
import { State } from '../../reducers';
import { useFetch } from '../../useFetch';
//Components
import AddNewAsset from './AddNewAsset';
import AssetInfo from './AssetInfo';
import EditAsset from './EditAsset';
/* import Message from '../common/Message/Message'; */
import ModalHeader from './ModalHeader';
import QuantityForm from './QuantityForm';
import ShowPrice from './ShowPrice';
import Success from './Success';
import UserAssetData from './UserAssetData';

const ModalContentWrapper: React.FC = (): JSX.Element => {
  const { modal, asset } = useSelector((state: State) => state);
  const [holdings, setHoldings] = useState(0);

  const { data, isLoading, isError } = useFetch(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${asset.defaultCurrency}&ids=${modal.activeCoin}`,
  );
  console.log(data);
  if (!data[0]) return <></>;

  const handleSubmit = () => {
    console.log('submit');
  };

  // if (displaySuccess) return <Success />;

  // if (isEditAsset) return <EditAsset id={activeCoin} />;

  // return <AddNewAsset id={activeCoin} />;
  return (
    <div className="modal-content-wrapper">
      <ModalHeader headerTitle="Add New Asset" />
      <AssetInfo props={data[0]} />
      {/* <Message /> */}
      <ShowPrice price={data[0].current_price} cur={asset.defaultCurrency} />
      <QuantityForm
        holdings={holdings}
        setHoldings={setHoldings}
        submitHandler={handleSubmit}
      />
      <UserAssetData props={data[0]} id={modal.activeCoin} />
    </div>
  );
};

export default ModalContentWrapper;
