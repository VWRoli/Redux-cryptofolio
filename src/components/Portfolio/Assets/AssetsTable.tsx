import { connect } from 'react-redux';
//Components
import Loading from '../../Loading';
import Error from '../../Error';
import AssetRow from './AssetRow';
import { AssetType } from '../../../actions/assetActions';

const mapStateToProps = (state: any) => ({
  assets: state.asset.assets,
  isError: state.asset.isError,
  isLoading: state.asset.isLoading,
});

type Props = {
  isLoading: boolean;
  isError: boolean;
  assets: AssetType[];
};

const AssetsTable: React.FC<Props> = ({
  isLoading,
  isError,
  assets,
}): JSX.Element => {
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

export default connect(mapStateToProps)(AssetsTable);
