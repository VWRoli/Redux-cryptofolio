import { useGlobalContext } from '../context';
import AddNewAsset from './AddAsset/AddNewAsset';
import EditAsset from './Portfolio/EditAsset';
import AddSuccess from './AddAsset/AddSuccess';

const ModalContent = () => {
  const { activeCoin, displaySuccess, isEditAsset } = useGlobalContext();

  if (displaySuccess) return <AddSuccess />;

  if (isEditAsset) return <EditAsset id={activeCoin} />;

  return <AddNewAsset id={activeCoin} />;
};

export default ModalContent;
