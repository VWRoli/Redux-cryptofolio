import React from 'react';

type Props = {
  submitHandler: any; //todo
  holdings: number;
  setHoldings: React.Dispatch<React.SetStateAction<number>>;
};

const QuantityForm: React.FC<Props> = ({
  submitHandler,
  holdings,
  setHoldings,
}): JSX.Element => {
  return (
    <form onSubmit={submitHandler}>
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
