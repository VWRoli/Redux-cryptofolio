import { AssetType, chartDataType, CoinType } from './Types';
import { API_KEY } from './constants/constant';

//Locale
const locale = navigator.language;

//Format Price Change
export const priceChangeFormatter = (priceChange: number): string => {
  const formattedPriceChange = new Intl.NumberFormat(locale, {
    style: 'percent',
    signDisplay: 'auto',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(priceChange / 100);

  return formattedPriceChange;
};

//Price formatter
export const priceFormatter = (price: number, currency: string): string => {
  //Locale
  const locale = navigator.language;
  const formattedPrice = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: `${currency}`,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
  return formattedPrice;
};

//URL formatter
export const urlFormatter = (url: string, array: AssetType[]): string => {
  const urlPart = array
    .map((item, i) => (i ? `${item.id}%2C%20` : `${item.id}`))
    .join('');
  return `${url}${urlPart}&x_cg_demo_api_key=${API_KEY}`;
};

//Calculate year to date
export const calcYtd = (): number => {
  const today = new Date();
  const startYear = new Date(today.getFullYear(), 0);
  const days = Math.floor((+today - +startYear) / (1000 * 60 * 60 * 24));
  return days;
};

//Buttons
export const BUTTONS = [
  { label: '1d', days: 1 },
  { label: '7d', days: 7 },
  { label: '30d', days: 30 },
  { label: '90d', days: 90 },
  { label: 'YTD', days: calcYtd() },
];

//Format chart data

export const chartDataFormatter = (
  data: { [key: string]: number[][] }[],
  assets: AssetType[],
): chartDataType[] | undefined => {
  //Get prices from chart data array, because it has market and voluma data too
  const priceData: number[][][] = data.map((item) => item.prices);

  //Calculate prices of holdings
  const holdingPrices: number[][] = priceData.map((array, i) => {
    const currentHoldings: number = assets[i].holdings;
    return array.map((item) => currentHoldings * item[1]);
  });

  if (!priceData[0]) return;

  //Get timestamps for chart
  const timeStamps: number[] = priceData[0].map((stamp: number[]) => stamp[0]);

  //Get and add the total price values
  const totalPrices: number[] = holdingPrices
    .map((array) => array.map((el) => el))
    .reduce((acc, curr) => acc.map((el, i) => el + curr[i]));

  //Createing a data Object for the chart
  const chartDataObj = timeStamps.map((el: number, i: number) => {
    //Configuration
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      weekday: 'long',
    } as const;

    //Locale
    const locale = navigator.language;
    //Formatting the date
    const formattedDate = new Intl.DateTimeFormat(locale, options).format(
      new Date(el),
    );

    return { day: formattedDate, price: totalPrices[i] };
  });
  return chartDataObj;
};
//Create Pie chart data
export const calcPieChartData = (
  assets: AssetType[],
  info: CoinType[],
): {
  id: string;
  value: number;
}[] => {
  return assets.map((asset) => {
    const [currentCoin] = info.filter((item) => asset.id === item.id);

    const totalValue = currentCoin.current_price * asset.holdings;
    return { id: asset.id, value: totalValue };
  });
};

//Calculate percentage change
export const calcChangePercentage = (
  curValue: number,
  change: number,
): number => {
  const newPrice = curValue;

  if (change > 0) {
    const oldPrice = curValue - change;
    return +[(newPrice - oldPrice) / oldPrice] * 100;
  } else {
    const oldPrice = curValue + Math.abs(change);
    return -Math.abs(+[(oldPrice - newPrice) / oldPrice] * 100);
  }
};

//To capitalize first letter
export function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
