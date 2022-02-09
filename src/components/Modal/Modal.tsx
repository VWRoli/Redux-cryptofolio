import { useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import { connect } from 'react-redux';
import { closeModal } from '../../actions/modalActions';
//Components
import ModalContent from './ModalContent';

const mapStateToProps = (state) => ({ isModalOpen: state.modal.isModalOpen });

const Modal = ({ isModalOpen, closeModal }) => {
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
      <div className='modal-container'>
        <button type='button' className='close-modal' onClick={closeModal}>
          <FaTimes className='icons' />
        </button>
        <ModalContent />
      </div>
    </div>
  );
};

export default connect(mapStateToProps, { closeModal })(Modal);
