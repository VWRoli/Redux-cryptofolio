import { AssetType, chartDataType, CoinType } from './Types';

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
    .map((item) => {
      return `${item.id}%2C%20`;
    })
    .join('');

  return `${url}${urlPart}`;
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
  data: any,
  assets: AssetType[],
): chartDataType[] | undefined => {
  //Get prices from chart data array, because it has market and voluma data too

  const priceData = data.map((item: any) => {
    return item.prices;
  });

  //Calculate prices of holdings
  const holdingPrices = priceData.map((array: any, i: number) => {
    const currentHoldings = assets[i].holdings;
    return array.map((item: any) => currentHoldings * item[1]);
  });

  if (!priceData[0]) return;

  //Get timestamps for chart
  const timeStamps = priceData[0].map((stamp: any) => stamp[0]);

  //Get and add the total price values
  const totalPrices = holdingPrices
    .map((array: any) => array.map((el: number) => el))
    .reduce((acc: any, curr: any) =>
      acc.map((el: number, i: number) => el + curr[i]),
    );

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
