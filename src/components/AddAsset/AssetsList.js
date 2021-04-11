import { useFetch } from '../../useFetch';
import Error from '../Error';
import Loading from '../Loading';
import ListItem from '../ListItem';
import { useGlobalContext } from '../../context';

const AssetsList = () => {
  const { assets, searchQuery } = useGlobalContext();

  let url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${searchQuery}&order=market_cap_desc&per_page=30&page=1&sparkline=false`;

  const { data: coins, isError, isLoading } = useFetch(url);

  //Handle no search results
  const noResults = coins[0] === undefined;

  //Get coins that are already added to the portfolio
  const getOwnedCoins = () => {
    const assetId = assets.map((asset) => asset.id);
    return coins.filter((coin) => assetId.includes(coin.id));
  };
  const ownedCoins = getOwnedCoins();

  //Error handling
  if (isError) {
    return <Error />;
  }

  //Loading screen
  if (isLoading) {
    return <Loading />;
  }
  return (
    <section id="asset-list">
      {noResults ? (
        <h3 className="no-results">
          We couldn't find your coin, please try again.
        </h3>
      ) : (
        coins.map((coin) => {
          const owned = ownedCoins.some((item) => item.id === coin.id);
          return <ListItem key={coin.id} coin={coin} owned={owned} />;
        })
      )}
    </section>
  );
};

export default AssetsList;
