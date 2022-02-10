import { ActionType } from './constants/actionTypes';

export interface IAssetState {
  isLoading: boolean;
  isError: boolean;
  assets: AssetType[];
  coinInfo: CoinType[];
  searchQuery: string;
  defaultCurrency: string;
  totalValue: number;
  totalValueChange: number;
  chartData: any[];
  chartDays: number;
}

export interface IModalState {
  isModalOpen: boolean;
  activeCoin: string;
  displaySuccess: boolean;
  isEditAsset: boolean;
}

interface CloseModalAction {
  type: ActionType.CLOSE_MODAL;
}
interface OpenSuccessAction {
  type: ActionType.OPEN_SUCCESS;
}
interface OpenModalAction {
  type: ActionType.OPEN_MODAL;
}
interface OpenEditAssetAction {
  type: ActionType.OPEN_EDIT_ASSET;
  payload: string;
}

interface AddAssetAction {
  type: ActionType.ADD_ASSET;
  payload: AssetType;
}
interface RemoveAssetAction {
  type: ActionType.REMOVE_ASSET;
  payload: AssetType[];
}
interface ClearAssetsAction {
  type: ActionType.CLEAR_ASSETS;
}
interface SetSearchQueryAction {
  type: ActionType.SET_QUERY;
  payload: string;
}
interface SetActiveCoinAction {
  type: ActionType.SET_ACTIVE_COIN;
  payload: string;
}
interface SetCurrencyAction {
  type: ActionType.SET_CURRENCY;
  payload: string;
}
interface SetChartDaysAction {
  type: ActionType.SET_DAYS;
  payload: number;
}
interface EditAssetAction {
  type: ActionType.EDIT_ASSET;
  payload: AssetType[];
}
interface SetLoadingAction {
  type: ActionType.LOADING;
}
interface DisplayInfoAction {
  type: ActionType.DISPLAY_INFO;
  payload: CoinType[];
}
interface SetChartDataAction {
  type: ActionType.SET_CHART_DATA;
  payload: any[];
}
interface GetTotalsAction {
  type: ActionType.GET_TOTALS;
}
interface GetTotalChangeAction {
  type: ActionType.GET_TOTAL_CHANGE;
}
interface SetErrorAction {
  type: ActionType.SET_ERROR;
}

export type Action =
  | OpenEditAssetAction
  | OpenModalAction
  | OpenSuccessAction
  | AddAssetAction
  | RemoveAssetAction
  | ClearAssetsAction
  | SetSearchQueryAction
  | SetActiveCoinAction
  | SetCurrencyAction
  | SetChartDaysAction
  | EditAssetAction
  | SetLoadingAction
  | DisplayInfoAction
  | SetChartDataAction
  | GetTotalsAction
  | GetTotalChangeAction
  | SetErrorAction
  | CloseModalAction;

export type CoinType = {
  name: string;
  image: string;
  symbol: string;
  current_price: number;
  price_change_percentage_24h: number;
  price_change_24h: number;
  id: string;
};

export type AssetType = {
  id: string;
  holdings: number;
};
