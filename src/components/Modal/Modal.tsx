import { useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { closeModal } from '../../actions/modalActions';
import { State } from '../../reducers';
//Components
import ModalContent from './ModalContent';

const Modal: React.FC = (): JSX.Element => {
  const isModalOpen = useSelector((state: State) => state.modal.isModalOpen);
  //Close Modal with clicking on overlay
  const handleClick = (
    e: React.MouseEvent<HTMLDivElement | HTMLButtonElement>
  ) => {
    if (e.currentTarget.classList.contains('modal-overlay')) {
      closeModal();
    }
  };

  //Close Modal with Esc
  //todo
  const handleKeyDown = (e: any) => {
    if (e.key === 'Escape') {
      closeModal();
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
        <button type="button" className="close-modal" onClick={closeModal}>
          <FaTimes className="icons" />
        </button>
        <ModalContent />
      </div>
    </div>
  );
};

export default Modal;
