import { FaRegCheckCircle } from 'react-icons/fa';
import { IoArrowForwardOutline } from 'react-icons/io5';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../actions/modalActions';
//Components
import Button from '../common/Button/Button';
import Message, { roleType } from '../common/Message/Message';
import Footnote from './Footnote';
import ModalHeader from './ModalHeader';

const SuccessModal: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();

  return (
    <>
      <ModalHeader headerTitle="Success!" />
      <FaRegCheckCircle className="success-icon" />
      <Message
        msg="You successfully added your new asset!"
        role={roleType.INFO}
      />
      <Button
        label="Go to my Portfolio"
        primary
        route="/portfolio"
        icon={<IoArrowForwardOutline />}
        fullWidth
        clickHandler={() => dispatch(closeModal())}
      />
      <Footnote />
    </>
  );
};

export default SuccessModal;
