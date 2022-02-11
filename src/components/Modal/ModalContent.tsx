import { useSelector } from 'react-redux';
import { State } from '../../reducers';
//Components
import AddNewAsset from './AddNewAsset';
import EditAsset from './EditAsset';
import Success from './Success';

const ModalContent: React.FC = (): JSX.Element => {
  const { activeCoin, displaySuccess, isEditAsset } = useSelector(
    (state: State) => state.modal
  );

  if (displaySuccess) return <Success />;

  if (isEditAsset) return <EditAsset id={activeCoin} />;

  return <AddNewAsset id={activeCoin} />;
};

export default ModalContent;
