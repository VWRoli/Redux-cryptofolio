import { FaEdit } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { editAsset } from '../../actions/assetActions';
import { State } from '../../reducers';
import { AssetModalProps } from './AddAssetModal';
//Components
import Button from '../common/Button/Button';
import AssetInfo from './AssetInfo';
import ModalHeader from './ModalHeader';
import QuantityForm from './QuantityForm';
import ShowPrice from './ShowPrice';
import { closeModal } from '../../actions/modalActions';
import SkeletonModal from './SkeletonModal';

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
