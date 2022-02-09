import { Link } from 'react-router-dom';
import { FaRegCheckCircle } from 'react-icons/fa';
import { connect } from 'react-redux';
import { closeModal } from '../../actions/modalActions';

const mapStateToProps = (state: any) => ({
  isEditAsset: state.modal.isEditAsset,
});

type Props = {
  closeModal: any;
  isEditAsset: boolean;
};

const AddSuccess: React.FC<Props> = ({
  closeModal,
  isEditAsset,
}): JSX.Element => {
  return (
    <section className="success-message">
      <h1>Success</h1>
      <FaRegCheckCircle className="success-icon" />
      {isEditAsset ? (
        <h2>You successfully edited your asset!</h2>
      ) : (
        <h2>You successfully added your new asset!</h2>
      )}

      <button type="button" className="primary-btn" onClick={closeModal}>
        <Link to="/portfolio">Go to my Portfolio</Link>
      </button>
      {isEditAsset ? (
        ''
      ) : (
        <p>
          Or add another{' '}
          <Link to="/addasset">
            <span className="back-to-addassets" onClick={closeModal}>
              Asset
            </span>
          </Link>
        </p>
      )}
    </section>
  );
};

export default connect(mapStateToProps, { closeModal })(AddSuccess);
