import React from 'react';
import Title from '../common/Title/Title';

type Props = {
  headerTitle: string;
};

const ModalHeader: React.FC<Props> = ({ headerTitle }): JSX.Element => {
  return (
    <header>
      <Title title={headerTitle} />
    </header>
  );
};

export default ModalHeader;
