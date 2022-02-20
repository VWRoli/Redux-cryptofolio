import { FaPlus } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { addAsset } from '../../actions/assetActions';
import { openSuccess } from '../../actions/modalActions';
import { State } from '../../reducers';
//Components
import Button from '../common/Button/Button';
import AssetInfo from './AssetInfo';
import ModalHeader from './ModalHeader';
import QuantityForm from './QuantityForm';
import ShowPrice from './ShowPrice';

export type AssetModalProps = {
  data: any; //todo usefetch data type should be what? data[0] is cointype
  holdings: number;
  setHoldings: React.Dispatch<React.SetStateAction<number>>;
};

const AddAssetModal: React.FC<AssetModalProps> = ({
  data,
  holdings,
  setHoldings,
}): JSX.Element => {
  const dispatch = useDispatch();
  const { modal, asset } = useSelector((state: State) => state);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(addAsset({ id: modal.activeCoin, holdings: +holdings }));
    dispatch(openSuccess());
    setHoldings(0);
  };

  return (
    <>
      <ModalHeader headerTitle="Add New Asset" />
      <AssetInfo props={data} />
      <ShowPrice price={data.current_price} cur={asset.defaultCurrency} />
      <QuantityForm
        id="add-form"
        holdings={holdings}
        setHoldings={setHoldings}
        submitHandler={handleSubmit}
      />
      <Button
        label="Add Asset"
        form="add-form"
        clickHandler={handleSubmit}
        primary
        icon={<FaPlus />}
        fullWidth
      />
    </>
  );
};

export default AddAssetModal;
