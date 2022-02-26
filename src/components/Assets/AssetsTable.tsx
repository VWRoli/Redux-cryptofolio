import { useSelector } from 'react-redux';
//Components
import Error from '../Error/Error';
import AssetRow from './AssetRow';
import { State } from '../../reducers';
import SkeletonAssetRow from './SkeletonAssetRow';

const AssetsTable: React.FC = (): JSX.Element => {
  const { assets, isError, isLoading } = useSelector(
    (state: State) => state.asset,
  );

  if (isError) {
    return (
      <tbody>
        <tr>
          <td colSpan={6}>
            <Error />
          </td>
        </tr>
      </tbody>
    );
  }

  return (
    <tbody>
      {isLoading ? (
        <SkeletonAssetRow />
      ) : (
        assets.map((asset) => <AssetRow key={asset.id} asset={asset} />)
      )}
    </tbody>
  );
};

export default AssetsTable;
