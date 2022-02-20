//Components
import Skeleton from '../common/Skeleton/Skeleton';

const SkeletonModal: React.FC = (): JSX.Element => {
  return (
    <>
      <Skeleton height={50} width={'100%'} />
      <Skeleton height={20} width={'60%'} />
      <Skeleton height={15} width={'20%'} />
      <Skeleton height={50} width={'70%'} />
      <Skeleton height={50} width={'100%'} />
    </>
  );
};

export default SkeletonModal;
