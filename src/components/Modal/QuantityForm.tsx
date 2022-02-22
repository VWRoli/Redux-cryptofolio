import React from 'react';

type Props = {
  submitHandler: any; //todo
  holdings: number;
  setHoldings: React.Dispatch<React.SetStateAction<number>>;
  id: string;
};

const QuantityForm: React.FC<Props> = ({
  submitHandler,
  holdings,
  setHoldings,
  id,
}): JSX.Element => {
  return (
    <form className="quantity-form" onSubmit={submitHandler} id={id}>
      <label htmlFor="holdings">Quantity: </label>
      <input
        type="number"
        name="holdings"
        id="holdings"
        value={holdings}
        onChange={(e) => setHoldings(+e.target.value)}
      />
    </form>
  );
};

export default QuantityForm;
