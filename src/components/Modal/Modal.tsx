import { useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../actions/modalActions';
import { State } from '../../reducers';
import IconButton from '../common/IconButton/IconButton';
//Components
import ModalContent from './ModalContentWrapper';

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
        <div className="close-modal">
          <IconButton
            icon={<FaTimes />}
            clickHandler={() => dispatch(closeModal())}
          />
        </div>
        <ModalContent />
      </div>
    </div>
  );
};

export default Modal;
