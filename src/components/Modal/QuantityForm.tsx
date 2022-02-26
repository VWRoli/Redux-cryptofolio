import React from 'react';
//Components
import Message, { roleType } from '../common/Message/Message';

type Props = {
  submitHandler: React.FormEventHandler | React.FormEventHandler;
  holdings: number;
  setHoldings: React.Dispatch<React.SetStateAction<number>>;
  id: string;
  inputError: string;
};

const QuantityForm: React.FC<Props> = ({
  submitHandler,
  holdings,
  setHoldings,
  id,
  inputError,
}): JSX.Element => {
  return (
    <form className="quantity-form" onSubmit={submitHandler} id={id}>
      <label htmlFor="holdings">Quantity: </label>
      <input
        type="number"
        name="holdings"
        id="holdings"
        required
        placeholder="Asset Quantity..."
        value={holdings}
        onChange={(e) => setHoldings(+e.target.value)}
      />
      <Message msg={inputError} role={roleType.ERROR} small />
    </form>
  );
};

export default QuantityForm;
