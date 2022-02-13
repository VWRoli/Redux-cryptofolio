import React from 'react';

type Props = {
  headerTitle: string;
};

const ModalHeader: React.FC<Props> = ({ headerTitle }): JSX.Element => {
  return (
    <header>
      <h1>{headerTitle}</h1>
    </header>
  );
};

export default ModalHeader;
