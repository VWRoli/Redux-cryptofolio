import { FaExclamationTriangle } from 'react-icons/fa';
//Components
import Button from '../common/Button/Button';
import Message, { roleType } from '../common/Message/Message';

const NotFound: React.FC = (): JSX.Element => {
  return (
    <section id="error-page">
      <h1>
        <FaExclamationTriangle /> Error
      </h1>
      <Message msg="Sorry, we couldn't find that page." role={roleType.INFO} />
      <Button primary label="Back Home" route="/" />
    </section>
  );
};

export default NotFound;
