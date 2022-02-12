import { FaExclamationTriangle } from 'react-icons/fa';

const Error: React.FC = (): JSX.Element => {
  return (
    <div className="error-container">
      <FaExclamationTriangle className="error-sign" />
      <p>Error fetching data, please refresh the page or try again later...</p>
    </div>
  );
};

export default Error;
