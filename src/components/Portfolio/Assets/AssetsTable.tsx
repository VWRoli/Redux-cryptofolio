import { useSelector } from 'react-redux';
//Components
import Loading from '../../Loading';
import Error from '../../Error';
import AssetRow from './AssetRow';
import { State } from '../../../reducers';

const AssetsTable: React.FC = (): JSX.Element => {
  const { assets, isError, isLoading } = useSelector(
    (state: State) => state.asset
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
        <tr>
          <td colSpan={6}>
            <Loading />
          </td>
        </tr>
      ) : (
        assets.map((asset) => {
          return <AssetRow key={asset.id} asset={asset} />;
        })
      )}
    </tbody>
  );
};

export default AssetsTable;
