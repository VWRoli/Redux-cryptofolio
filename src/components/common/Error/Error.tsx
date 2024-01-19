import { FaExclamationTriangle } from 'react-icons/fa';
//Components
import Message, { roleType } from '../Message/Message';

type Props = {
  msg: string;
};

const Error: React.FC<Props> = ({ msg }): JSX.Element => {
  return (
    <div className="error-container">
      <FaExclamationTriangle className="error-sign" />
      <Message msg={msg} role={roleType.ERROR} />
    </div>
  );
};

export default Error;
