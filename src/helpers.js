//Locale
const locale = navigator.language;

//Format Price Change
export const priceChangeFormatter = (priceChange) => {
  const formattedPriceChange = new Intl.NumberFormat(locale, {
    style: 'percent',
    signDisplay: 'exceptZero',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(priceChange / 100);

  return formattedPriceChange;
};

//URL formatter
export const urlFormatter = (url, array) => {
  const urlPart = array
    .map((item) => {
      return `${item.id}%2C%20`;
    })
    .join('');

  return `${url}${urlPart}`;
};

//Calculate year to date
export const calcYtd = () => {
  const today = new Date();
  const startYear = new Date(today.getFullYear(), 0);
  const days = Math.floor((today - startYear) / (1000 * 60 * 60 * 24));
  return days;
};
calcYtd();

//Format chart data
export const chartDataFormatter = (data, assets) => {
  //Get prices from chart data array, because it has market and voluma data too

  const priceData = data.map((item) => {
    return item.prices;
  });

  //Calculate prices of holdings
  const holdingPrices = priceData.map((array, i) => {
    const currentHoldings = assets[i].holdings;
    return array.map((item) => currentHoldings * item[1]);
  });

  if (!priceData[0]) return;

  //Get timestamps for chart
  const timeStamps = priceData[0].map((stamp) => stamp[0]);

  //Get and add the total price values
  const totalPrices = holdingPrices
    .map((array) => array.map((el) => el))
    .reduce((acc, curr) => acc.map((el, i) => el + curr[i]));

  //Createing a data Object for the chart
  const chartDataObj = timeStamps.map((el, i) => {
    //Configuration
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      weekday: 'long',
    };

    //Locale
    const locale = navigator.language;
    //Formatting the date
    const formattedDate = new Intl.DateTimeFormat(locale, options).format(
      new Date(el)
    );

    return { day: formattedDate, price: totalPrices[i] };
  });
  return chartDataObj;
};
//Create Pie chart data
export const calcPieChartData = (assets, info) => {
  return assets.map((asset) => {
    const [currentCoin] = info.filter((item) => asset.id === item.id);

    const totalValue = currentCoin.current_price * asset.holdings;
    return { id: asset.id, value: totalValue };
  });
};

//Calculate percentage change
export const calcChangePercentage = (curValue, change) => {
  let percentage;
  const newPrice = curValue;

  if (change > 0) {
    const oldPrice = curValue - change;
    return (percentage = [(newPrice - oldPrice) / oldPrice] * 100);
  } else {
    const oldPrice = curValue + Math.abs(change);
    return -Math.abs((percentage = [(oldPrice - newPrice) / oldPrice] * 100));
  }
};
