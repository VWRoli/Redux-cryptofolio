import { AssetType, CoinType } from '../Types';
import { ActionType } from '../constants/actionTypes';
import { IAssetState, Action } from '../Types';

const defaultState: IAssetState = {
  isLoading: false,
  isError: false,
  assets: [],
  coinInfo: [],
  searchQuery: '',
  defaultCurrency: 'usd',
  totalValue: 0,
  totalValueChange: 0,
  chartData: [],
  chartDays: 7,
};

const asset = (
  state: IAssetState = defaultState,
  action: Action,
): IAssetState => {
  const assets = state.assets;

  switch (action.type) {
    case ActionType.CLEAR_ASSETS:
      return { ...state, assets: [] };

    case ActionType.REMOVE_ASSET:
      return {
        ...state,
        assets: action.payload,
      };
    case ActionType.ADD_ASSET:
      return { ...state, assets: [...state.assets, action.payload] };
    case ActionType.LOADING:
      return { ...state, isLoading: true };
    case ActionType.DISPLAY_INFO:
      return { ...state, coinInfo: action.payload, isLoading: false };
    case ActionType.SET_ERROR:
      return { ...state, isError: true, isLoading: false };
    case ActionType.EDIT_ASSET:
      return { ...state, assets: action.payload };
    case ActionType.SET_CURRENCY:
      return { ...state, defaultCurrency: action.payload };
    case ActionType.SET_QUERY:
      return { ...state, searchQuery: action.payload };
    case ActionType.GET_TOTALS: {
      //Get the current value for the whole portfolio
      const currentAssetValue = assets
        .map((asset: AssetType) => {
          const [correctCoin] = state.coinInfo.filter(
            (coin: CoinType) => coin.id === asset.id,
          );
          return asset.holdings * +correctCoin.current_price;
        })
        .reduce((acc: number, cur: number) => acc + cur, 0);

      return { ...state, totalValue: currentAssetValue };
    }

    case ActionType.GET_TOTAL_CHANGE: {
      //Get the 24h price change for the whole portfolio
      const assetValueChange = assets
        .map((asset: AssetType) => {
          const [correctCoin] = state.coinInfo.filter(
            (coin: CoinType) => coin.id === asset.id,
          );

          return asset.holdings * +correctCoin.price_change_24h;
        })
        .reduce((acc: number, cur: number) => acc + cur, 0);

      return { ...state, totalValueChange: assetValueChange, isLoading: false };
    }

    case ActionType.SET_CHART_DATA:
      return { ...state, chartData: action.payload, isLoading: false };

    case ActionType.SET_DAYS:
      return { ...state, chartDays: action.payload };
    default:
      return state;
  }
};
export default asset;
