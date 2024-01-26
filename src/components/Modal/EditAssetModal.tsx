import { FaEdit } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { editAsset } from '../../actions/assetActions';
import { State } from '../../reducers';
import { closeModal } from '../../actions/modalActions';
import { useEffect, useState } from 'react';
import { CoinType } from '../../Types';
//Components
import Button from '../common/Button/Button';
import AssetInfo from './AssetInfo';
import ModalHeader from './ModalHeader';
import QuantityForm from './QuantityForm';
import ShowPrice from './ShowPrice';
import SkeletonModal from './SkeletonModal';
import Error from '../common/Error/Error';

export type EditAssetModalProps = {
  data: CoinType;
  isLoading: boolean;
  disabled: boolean;
  inputError: string;
  resetError: () => void;
  validate: (holdings: string) => boolean;
};

const EditAssetModal: React.FC<EditAssetModalProps> = ({
  data,
  isLoading,
  disabled,
  inputError,
  validate,
  resetError,
}) => {
  const dispatch = useDispatch();
  const { modal, asset } = useSelector((state: State) => state);
  const [correctCoin] = asset.assets.filter(
    (asset) => asset.id === modal.activeCoin,
  );
  const [holdings, setHoldings] = useState(correctCoin.holdings + '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    validate(holdings);
    dispatch(editAsset(correctCoin, holdings));
    dispatch(closeModal());
    setHoldings('');
  };

  useEffect(() => {
    validate(holdings);
  }, [holdings]);

  if (!data)
    return (
      <>
        <ModalHeader headerTitle="Edit Asset" />
        <Error msg="Error fetching data, please refresh the page or try again later..." />
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
            resetError={resetError}
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
