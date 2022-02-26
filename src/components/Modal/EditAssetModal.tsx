import { FaEdit } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { editAsset } from '../../actions/assetActions';
import { State } from '../../reducers';
import { AssetModalProps } from './AddAssetModal';
import { closeModal } from '../../actions/modalActions';
//Components
import Button from '../common/Button/Button';
import AssetInfo from './AssetInfo';
import ModalHeader from './ModalHeader';
import QuantityForm from './QuantityForm';
import ShowPrice from './ShowPrice';
import SkeletonModal from './SkeletonModal';
import Error from '../Error/Error';

const EditAssetModal: React.FC<AssetModalProps> = ({
  data,
  holdings,
  setHoldings,
  isLoading,
  disabled,
  inputError,
}) => {
  const dispatch = useDispatch();
  const { modal, asset } = useSelector((state: State) => state);
  const [correctCoin] = asset.assets.filter(
    (asset) => asset.id === modal.activeCoin,
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(editAsset(correctCoin, holdings));
    dispatch(closeModal());
    setHoldings(1);
  };

  if (!data)
    return (
      <>
        <ModalHeader headerTitle="Edit Asset" />
        <Error />
      </>
    );

  return (
    <>
      {isLoading ? (
        <SkeletonModal />
      ) : (
        <>
          <ModalHeader headerTitle="Edit Asset" />
          <AssetInfo props={data} />
          <ShowPrice price={data.current_price} cur={asset.defaultCurrency} />
          <QuantityForm
            id="edit-form"
            holdings={holdings}
            setHoldings={setHoldings}
            submitHandler={handleSubmit}
            inputError={inputError}
          />
          <Button
            label="Edit Asset"
            form="edit-form"
            clickHandler={handleSubmit}
            primary
            icon={<FaEdit />}
            fullWidth
            disabled={disabled}
          />
        </>
      )}
    </>
  );
};

export default EditAssetModal;
