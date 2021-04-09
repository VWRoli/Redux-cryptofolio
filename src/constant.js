import { calcYtd } from './helpers';

export const BASE_URL = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=xlm&order=market_cap_desc&per_page=9&page=1&sparkline=false`;

export const CLEAR_ASSETS = 'CLEAR_ASSETS';
export const REMOVE_ASSET = 'REMOVE_ASSET';
export const LOADING = 'LOADING';
export const DISPLAY_INFO = 'DISPLAY_INFO';
export const GET_TOTALS = 'GET_TOTALS';
export const GET_TOTAL_CHANGE = 'GET_TOTAL_CHANGE';
export const SET_CHART_DATA = 'SET_CHART_DATA';
export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';
export const SET_ACTIVE_COIN = 'SET_ACTIVE_COIN';
export const ADD_ASSET = 'ADD_ASSET';
export const OPEN_SUCCESS = 'OPEN_SUCCESS';
export const SET_QUERY = 'SET_QUERY';
export const SET_ERROR = 'SET_ERROR';
export const SET_DAYS = 'SET_DAYS';
export const OPEN_EDIT_ASSET = 'OPEN_EDIT_ASSET';
export const EDIT_ASSET = 'EDIT_ASSET';
export const SET_CURRENCY = 'SET_CURRENCY';

export const RADIAN = Math.PI / 180;
export const COLORS = [
  '#00b6e3',
  '#FFBB28',
  '#00e4ac',
  '#0088FE',
  '#00C49F',
  '#FF8042',
  '#dce2e2',
  '#5ec576',
  '#ffcb03',
  '#ff585f',
  '#5ec576',
  '#ff5860',
];

//Buttons
export const BUTTONS = [
  { label: '1d', days: '1' },
  { label: '7d', days: '7' },
  { label: '30d', days: '30' },
  { label: '90d', days: '90' },
  { label: 'YTD', days: calcYtd() },
];
