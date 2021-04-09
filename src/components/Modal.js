import { useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import { useGlobalContext } from '../context';

import ModalContent from './ModalContent';

const Modal = () => {
  const { isModalOpen, closeModal } = useGlobalContext();

  //Close Modal with clicking on overlay
  const handleClick = (e) => {
    if (e.target.classList.contains('modal-overlay')) {
      closeModal();
    }
  };

  //Close Modal with Esc
  const handleKeyDown = (e) => {
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
