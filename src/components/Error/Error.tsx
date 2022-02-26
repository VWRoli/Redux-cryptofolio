import { FaExclamationTriangle } from 'react-icons/fa';
//Components
import Message, { roleType } from '../common/Message/Message';

const Error: React.FC = (): JSX.Element => {
  return (
    <div className="error-container">
      <FaExclamationTriangle className="error-sign" />
      <Message
        msg="Error fetching data, please refresh the page or try again later..."
        role={roleType.ERROR}
      />
    </div>
  );
};

export default Error;
