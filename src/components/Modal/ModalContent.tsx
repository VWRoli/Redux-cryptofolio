import { connect } from 'react-redux';
//Components
import AddNewAsset from './AddNewAsset';
import EditAsset from './EditAsset';
import Success from './Success';

const mapStateToProps = (state: any) => ({
  isEditAsset: state.modal.isEditAsset,
  displaySuccess: state.modal.displaySuccess,
  activeCoin: state.modal.activeCoin,
});

type Props = {
  activeCoin: string;
  //todo
  displaySuccess: any;
  isEditAsset: boolean;
};

const ModalContent: React.FC<Props> = ({
  activeCoin,
  displaySuccess,
  isEditAsset,
}): JSX.Element => {
  if (displaySuccess) return <Success />;

  if (isEditAsset) return <EditAsset id={activeCoin} />;

  return <AddNewAsset id={activeCoin} />;
};

export default connect(mapStateToProps)(ModalContent);
