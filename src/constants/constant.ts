export const API_URL = process.env.REACT_APP_API_URL;
export const API_KEY = process.env.REACT_APP_API_KEY;

export const BASE_URL = `${API_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=9&page=1&x_cg_demo_api_key=${API_KEY}`;
export const CURRENCY_URL = `${API_URL}/simple/supported_vs_currencies?x_cg_demo_api_key=${API_KEY}`;

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
