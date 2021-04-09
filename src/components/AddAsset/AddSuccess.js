import { Link } from 'react-router-dom';
import { FaRegCheckCircle } from 'react-icons/fa';
import { useGlobalContext } from '../../context';

const AddSuccess = () => {
  const { closeModal, isEditAsset } = useGlobalContext();

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
          <span className="back-to-addassets" onClick={closeModal}>
            Asset
          </span>
        </p>
      )}
    </section>
  );
};

export default AddSuccess;
