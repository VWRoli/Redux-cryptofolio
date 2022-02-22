import { FaRegCheckCircle } from 'react-icons/fa';
import { IoArrowForwardOutline } from 'react-icons/io5';
//Components
import Button from '../common/Button/Button';
import Message, { roleType } from '../common/Message/Message';
import Footnote from './Footnote';
import ModalHeader from './ModalHeader';

const SuccessModal: React.FC = (): JSX.Element => {
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
      />
      <Footnote />
    </>
  );
};

export default SuccessModal;
