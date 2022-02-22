import { useDispatch, useSelector } from 'react-redux';
import { clearAssets } from '../../actions/assetActions';
import { State } from '../../reducers';
import { GrClear } from 'react-icons/gr';
//Components
import AssetsTableHeader from './AssetsTableHeader';
import AssetsTable from './AssetsTable';
import Button from '../common/Button/Button';
import AssetsHeader from './AssetsHeader';
import Message, { roleType } from '../common/Message/Message';

const Assets: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();

  const assets = useSelector((state: State) => state.asset.assets);

  const handleClear = () => dispatch(clearAssets());

  return (
    <section id="assets">
      <AssetsHeader />
      <table>
        <AssetsTableHeader />
        {assets.length === 0 ? (
          <tbody>
            <tr>
              <td colSpan={6}>
                <Message
                  msg="You don't have any assets in your portfolio."
                  role={roleType.INFO}
                />
              </td>
            </tr>
          </tbody>
        ) : (
          <AssetsTable />
        )}
      </table>

      {assets.length !== 0 && (
        <div style={{ margin: 'auto' }}>
          <Button
            label="Clear Assets"
            clickHandler={handleClear}
            icon={<GrClear />}
          />
        </div>
      )}
    </section>
  );
};

export default Assets;
