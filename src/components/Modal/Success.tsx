import { Link } from 'react-router-dom';
import { FaRegCheckCircle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../actions/modalActions';
import { State } from '../../reducers';
import { IoArrowForwardOutline } from 'react-icons/io5';
import Button from '../common/Button/Button';

const Success: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const isEditAsset = useSelector((state: State) => state.modal.isEditAsset);

  const handleClick = () => dispatch(closeModal());

  return (
    <section className="success-message">
      <h1>Success</h1>
      <FaRegCheckCircle className="success-icon" />
      {isEditAsset ? (
        <h2>You successfully edited your asset!</h2>
      ) : (
        <h2>You successfully added your new asset!</h2>
      )}
      <div style={{ margin: '1rem 0' }}>
        <Button
          label="Go to my Portfolio"
          route="/portfolio"
          primary
          clickHandler={handleClick}
          icon={<IoArrowForwardOutline />}
        />
      </div>

      {!isEditAsset && (
        <p>
          Or add another{' '}
          <Link to="/addasset">
            <span
              className="back-to-addassets"
              onClick={() => dispatch(closeModal())}
            >
              Asset
            </span>
          </Link>
        </p>
      )}
    </section>
  );
};

export default Success;
