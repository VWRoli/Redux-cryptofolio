import { useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../actions/modalActions';
import { State } from '../../reducers';
//Components
import ModalContent from './ModalContent';

const Modal: React.FC = (): JSX.Element => {
  const isModalOpen = useSelector((state: State) => state.modal.isModalOpen);
  const dispatch = useDispatch();

  //Close Modal with clicking on overlay
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // If you have to use event.target itself, you have to cast the object:
    const target = e.target as HTMLButtonElement;
    if (target.classList.contains('modal-overlay')) {
      dispatch(closeModal());
    }
  };

  //Close Modal with Esc
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      dispatch(closeModal());
    }
  };
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  });

  return (
    <div
      className={isModalOpen ? 'modal-overlay show-modal' : 'modal-overlay'}
      onMouseDown={handleClick}
    >
      <div className="modal-container">
        <button
          type="button"
          className="close-modal"
          onClick={() => dispatch(closeModal())}
        >
          <FaTimes className="icons" />
        </button>
        <ModalContent />
      </div>
    </div>
  );
};

export default Modal;
