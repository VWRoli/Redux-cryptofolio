import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { closeModal } from '../../actions/modalActions';

const Footnote = () => {
  const dispatch = useDispatch();
  return (
    <p style={{ margin: '1rem' }}>
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
  );
};

export default Footnote;
