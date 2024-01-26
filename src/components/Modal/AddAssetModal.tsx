import { FaPlus } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { addAsset } from '../../actions/assetActions';
import { openSuccess } from '../../actions/modalActions';
import { State } from '../../reducers';
import { CoinType } from '../../Types';
//Components
import Button from '../common/Button/Button';
import Error from '../common/Error/Error';
import AssetInfo from './AssetInfo';
import ModalHeader from './ModalHeader';
import QuantityForm from './QuantityForm';
import ShowPrice from './ShowPrice';
import SkeletonModal from './SkeletonModal';

export type AssetModalProps = {
  data: CoinType;
  holdings: string;
  setHoldings: React.Dispatch<React.SetStateAction<string>>;
  isLoading: boolean;
  disabled: boolean;
  inputError: string;
  resetError: () => void;
  validate: () => boolean;
};

const AddAssetModal: React.FC<AssetModalProps> = ({
  data,
  holdings,
  setHoldings,
  isLoading,
  disabled,
  inputError,
  validate,
  resetError,
}): JSX.Element => {
  const dispatch = useDispatch();
  const { modal, asset } = useSelector((state: State) => state);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    //validate input string
    if (validate()) return;

    dispatch(addAsset({ id: modal.activeCoin, holdings: +holdings }));
    dispatch(openSuccess());
    setHoldings('');
  };

  if (!data)
    return (
      <>
        <ModalHeader headerTitle="Add New Asset" />
        <Error msg="Error fetching data, please refresh the page or try again later..." />
      </>
    );

  return (
    <>
      <ModalHeader headerTitle="Add New Asset" />
      {isLoading ? (
        <SkeletonModal />
      ) : (
        <>
          <AssetInfo props={data} />
          <ShowPrice price={data.current_price} cur={asset.defaultCurrency} />
          <QuantityForm
            id="add-form"
            holdings={holdings}
            setHoldings={setHoldings}
            submitHandler={handleSubmit}
            inputError={inputError}
            resetError={resetError}
          />
          <Button
            label="Add Asset"
            form="add-form"
            clickHandler={handleSubmit}
            primary
            icon={<FaPlus />}
            fullWidth
            disabled={disabled}
          />
        </>
      )}
    </>
  );
};

export default AddAssetModal;
