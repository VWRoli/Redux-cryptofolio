import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../actions/modalActions';
import { State } from '../../reducers';
import { ModalType } from '../../Types';
import { useFetch } from '../../hooks/useFetch';
//Components
import AddAssetModal from './AddAssetModal';
import EditAssetModal from './EditAssetModal';
import SuccessModal from './SuccessModal';
import { API_KEY, API_URL } from '../../constants/constant';

const ModalFrame: React.FC = (): JSX.Element => {
  const { modal, asset } = useSelector((state: State) => state);
  const [holdings, setHoldings] = useState('');
  const [disabled, setDisabled] = useState(false);
  const [inputError, setInputError] = useState('');
  const dispatch = useDispatch();

  const validate = (holdings: string) => {
    const pasredHoldings = parseFloat(holdings);

    if (holdings.includes(',')) {
      setInputError('Error! Please use decimal points instead of commas.');
      setDisabled(true);
      return true;
    }
    //handle NaN
    if (Number.isNaN(pasredHoldings)) {
      setInputError('Error! Please enter a valid number.');
      setDisabled(true);
      return true;
    } else if (pasredHoldings <= 0) {
      //handle negative numbers and zero
      setInputError('Please enter a positive number');
      setDisabled(true);
      return true;
    } else {
      setInputError('');
      setDisabled(false);
      return false;
    }
  };

  const resetError = () => {
    setInputError('');
    setDisabled(false);
  };

  //Modal types
  const success = modal.modal === ModalType.SUCCESS;
  const edit = modal.modal === ModalType.EDIT;
  const add = modal.modal === ModalType.ADD;

  //Close modal automatically only if it shows Successmodal
  function autoCloseModal() {
    setTimeout(() => {
      if (success) {
        dispatch(closeModal());
      }
    }, 3000);
  }
  autoCloseModal();

  const { data, isLoading } = useFetch(
    `${API_URL}/coins/markets?vs_currency=${asset.defaultCurrency}&ids=${modal.activeCoin}&x_cg_demo_api_key=${API_KEY}`,
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
          resetError={resetError}
          validate={validate}
        />
      )}
      {edit && (
        <EditAssetModal
          data={data[0]}
          isLoading={isLoading}
          disabled={disabled}
          inputError={inputError}
          resetError={resetError}
          validate={validate}
        />
      )}
      {success && <SuccessModal />}
    </div>
  );
};

export default ModalFrame;
