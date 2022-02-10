import { Link } from 'react-router-dom';
import { FaRegCheckCircle } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { closeModal } from '../../actions/modalActions';
import { State } from '../../reducers';

const AddSuccess: React.FC = (): JSX.Element => {
  const isEditAsset = useSelector((state: State) => state.modal.isEditAsset);

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

export default AddSuccess;
