import { connect } from 'react-redux';
//Components
import AddNewAsset from './AddNewAsset';
import EditAsset from './EditAsset';
import Success from './Success';

const mapStateToProps = (state) => ({
  isEditAsset: state.modal.isEditAsset,
  displaySuccess: state.modal.displaySuccess,
  activeCoin: state.modal.activeCoin,
});

const ModalContent = ({ activeCoin, displaySuccess, isEditAsset }) => {
  if (displaySuccess) return <Success />;

  if (isEditAsset) return <EditAsset id={activeCoin} />;

  return <AddNewAsset id={activeCoin} />;
};

export default connect(mapStateToProps)(ModalContent);
