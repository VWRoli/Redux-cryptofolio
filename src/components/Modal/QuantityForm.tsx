import React from 'react';
//Components
import Message, { roleType } from '../common/Message/Message';

type Props = {
  submitHandler: React.FormEventHandler | React.FormEventHandler;
  holdings: string;
  setHoldings: React.Dispatch<React.SetStateAction<string>>;
  id: string;
  inputError: string;
  resetError: () => void;
};

const QuantityForm: React.FC<Props> = ({
  submitHandler,
  holdings,
  setHoldings,
  id,
  inputError,
  resetError,
}): JSX.Element => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHoldings(e.target.value);
    resetError();
  };
  return (
    <form className="quantity-form" onSubmit={submitHandler} id={id}>
      <label htmlFor="holdings">Quantity: </label>
      <input
        type="text"
        name="holdings"
        id="holdings"
        required
        placeholder="Asset Quantity..."
        value={holdings}
        onChange={handleChange}
      />
      <Message msg={inputError} role={roleType.ERROR} small />
    </form>
  );
};

export default QuantityForm;
