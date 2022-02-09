import { useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import { connect } from 'react-redux';
import { closeModal } from '../../actions/modalActions';
//Components
import ModalContent from './ModalContent';

const mapStateToProps = (state: any) => ({
  isModalOpen: state.modal.isModalOpen,
});

type Props = {
  isModalOpen: boolean;
  closeModal: any;
};

const Modal: React.FC<Props> = ({ isModalOpen, closeModal }): JSX.Element => {
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

export default connect(mapStateToProps, { closeModal })(Modal);
