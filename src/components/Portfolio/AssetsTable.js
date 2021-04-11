import { connect } from 'react-redux';
//Components
import Loading from '../Loading';
import Error from '../Error';
import AssetRow from './AssetRow';

const mapStateToProps = (state) => ({
  assets: state.asset.assets,
  isError: state.asset.isError,
  isLoading: state.asset.isLoading,
});

const AssetsTable = ({ isLoading, isError, assets }) => {
  if (isError) {
    return (
      <tbody>
        <tr>
          <td colSpan='6'>
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
          <td colSpan='6'>
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
