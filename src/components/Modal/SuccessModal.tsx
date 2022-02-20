import { FaRegCheckCircle } from 'react-icons/fa';
import { IoArrowForwardOutline } from 'react-icons/io5';
//Components
import Button from '../common/Button/Button';
import Footnote from './Footnote';
import ModalHeader from './ModalHeader';

const SuccessModal = () => {
  return (
    <>
      <ModalHeader headerTitle="Success!" />
      <FaRegCheckCircle className="success-icon" />
      {/* <Message /> */}
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
