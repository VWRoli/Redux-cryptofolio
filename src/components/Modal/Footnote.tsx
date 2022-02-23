import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { closeModal } from '../../actions/modalActions';

const Footnote = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(closeModal());
  };
  return (
    <p style={{ margin: '1rem' }}>
      Or add an{' '}
      <Link to="/addasset">
        <span className="back-to-addassets" onClick={handleClick}>
          Asset
        </span>
      </Link>
    </p>
  );
};

export default Footnote;
