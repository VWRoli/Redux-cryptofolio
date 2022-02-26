import { useState } from 'react';
//import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
//import { closeModal } from '../../actions/modalActions';
import { State } from '../../reducers';
import { ModalType } from '../../Types';
import { useFetch } from '../../hooks/useFetch';
//Components
import AddAssetModal from './AddAssetModal';
import EditAssetModal from './EditAssetModal';
import SuccessModal from './SuccessModal';

const ModalFrame: React.FC = (): JSX.Element => {
  const { modal, asset } = useSelector((state: State) => state);
  const [holdings, setHoldings] = useState(1);
  const [disabled, setDisabled] = useState(false);
  const [inputError, setInputError] = useState('');
  //const dispatch = useDispatch();
  //const history = useHistory();

  const validate = () => {
    if (holdings > 0) {
      setInputError('');
      setDisabled(false);
      return;
    } else {
      setInputError('Quantity should be bigger than zero.');
      setDisabled(true);
      return;
    }
  };

  //Modal types
  const success = modal.modal === ModalType.SUCCESS;
  const edit = modal.modal === ModalType.EDIT;
  const add = modal.modal === ModalType.ADD;

  //Close modal automatically only if it shows Successmodal
  // function autoCloseModal() {
  //   setTimeout(() => {
  //     if (success) {
  //       //todo not working properly, pushes history after we closed the modal history.push('/portfolio');
  //also closes off modal even if not success
  //       dispatch(closeModal());
  //     }
  //   }, 3000);
  // }
  //autoCloseModal();

  const { data, isLoading } = useFetch(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${asset.defaultCurrency}&ids=${modal.activeCoin}`,
  );

  return (
    <div className="modal-content-wrapper">
      {add && (
        <AddAssetModal
          data={data[0]}
          holdings={holdings}
          setHoldings={setHoldings}
          isLoading={isLoading}
          disabled={disabled}
          inputError={inputError}
          validate={validate}
        />
      )}
      {edit && (
        <EditAssetModal
          data={data[0]}
          holdings={holdings}
          setHoldings={setHoldings}
          isLoading={isLoading}
          disabled={disabled}
          inputError={inputError}
          validate={validate}
        />
      )}
      {success && <SuccessModal />}
    </div>
  );
};

export default ModalFrame;
