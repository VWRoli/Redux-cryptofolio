import { useState } from 'react';
import { useSelector } from 'react-redux';
import { State } from '../../reducers';
import { ModalType } from '../../Types';
import { useFetch } from '../../useFetch';
import { FaEdit, FaPlus, FaRegCheckCircle } from 'react-icons/fa';
import { IoArrowForwardOutline } from 'react-icons/io5';

//Components
import AssetInfo from './AssetInfo';
/* import Message from '../common/Message/Message'; */
import ModalHeader from './ModalHeader';
import QuantityForm from './QuantityForm';
import ShowPrice from './ShowPrice';
import UserAssetData from './UserAssetData';
import Button from '../common/Button/Button';
import Footnote from './Footnote';

const ModalContentWrapper: React.FC = (): JSX.Element => {
  const { modal, asset } = useSelector((state: State) => state);
  const [holdings, setHoldings] = useState(0);

  //Modal types
  const success = modal.modal === ModalType.SUCCESS;
  const edit = modal.modal === ModalType.EDIT;
  const add = modal.modal === ModalType.ADD;

  //todo
  const { data, isLoading, isError } = useFetch(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${asset.defaultCurrency}&ids=${modal.activeCoin}`,
  );

  if (!data[0]) return <></>;

  const handleSubmit = () => {
    console.log('submit');
  };
  console.log(modal.modal);
  // if (displaySuccess) return <Success />;

  // if (isEditAsset) return <EditAsset id={activeCoin} />;

  // return <AddNewAsset id={activeCoin} />;
  return (
    <div className="modal-content-wrapper">
      <ModalHeader
        headerTitle={add ? 'Add New Asset' : edit ? 'Edit Asset' : 'Success!'}
      />

      {success && <FaRegCheckCircle className="success-icon" />}

      {success || (
        <>
          <AssetInfo props={data[0]} />{' '}
          <ShowPrice
            price={data[0].current_price}
            cur={asset.defaultCurrency}
          />
        </>
      )}

      {/* <Message /> */}

      {edit && <UserAssetData props={data[0]} id={modal.activeCoin} />}

      {success || (
        <QuantityForm
          holdings={holdings}
          setHoldings={setHoldings}
          submitHandler={handleSubmit}
        />
      )}

      <Button
        label={
          success ? 'Go to my Portfolio' : edit ? 'Edit Asset' : 'Add Asset'
        }
        primary
        icon={
          success ? <IoArrowForwardOutline /> : edit ? <FaEdit /> : <FaPlus />
        }
        fullWidth
      />
      {success && <Footnote />}
    </div>
  );
};

export default ModalContentWrapper;
