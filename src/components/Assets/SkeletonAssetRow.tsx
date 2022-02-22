//Components
import Skeleton from '../common/Skeleton/Skeleton';

const SkeletonAssetRow: React.FC = (): JSX.Element => {
  return (
    <>
      <tr className="skeleton-row">
        <td>
          <Skeleton height={30} width={'100%'} />
        </td>
        <td>
          <Skeleton height={30} width={'50%'} />
        </td>
        <td>
          <Skeleton height={30} width={'50%'} />
        </td>
        <td>
          <Skeleton height={30} width={'70%'} />
        </td>
        <td>
          <Skeleton height={30} width={'50%'} />
        </td>
        <td>
          <Skeleton height={30} width={'50%'} />
        </td>
      </tr>
    </>
  );
};

export default SkeletonAssetRow;
