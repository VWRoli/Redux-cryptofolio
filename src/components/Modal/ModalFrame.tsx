import { useState } from 'react';
import { useSelector } from 'react-redux';
import { State } from '../../reducers';
import { ModalType } from '../../Types';
import { useFetch } from '../../useFetch';
//Components
import AddAssetModal from './AddAssetModal';
import EditAssetModal from './EditAssetModal';
import SuccessModal from './SuccessModal';

const ModalFrame: React.FC = (): JSX.Element => {
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

  return (
    <div className="modal-content-wrapper">
      {add && (
        <AddAssetModal
          data={data[0]}
          holdings={holdings}
          setHoldings={setHoldings}
          isLoading={isLoading}
        />
      )}
      {edit && (
        <EditAssetModal
          data={data[0]}
          holdings={holdings}
          setHoldings={setHoldings}
          isLoading={isLoading}
        />
      )}
      {success && <SuccessModal />}
    </div>
  );
};

export default ModalFrame;
