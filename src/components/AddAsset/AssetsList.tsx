import { useFetch } from '../../hooks/useFetch';
import { AssetType } from '../../Types';
import { useSelector } from 'react-redux';
import { State } from '../../reducers';
import { CoinType } from '../../Types';
//Components
import Error from '../common/Error/Error';
import Loading from '../common/Loading/Loading';
import ListItem from '../common/ListItem/ListItem';
import Message, { roleType } from '../common/Message/Message';

const AssetsList: React.FC = (): JSX.Element => {
  const { assets, searchQuery } = useSelector((state: State) => state.asset);

  const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${searchQuery}&order=market_cap_desc&per_page=30&page=1&sparkline=false`;

  const { data: coins, isError, isLoading } = useFetch(url);

  //Handle no search results
  const noResults = coins.length === 0;

  //Get coins that are already added to the portfolio
  const getOwnedCoins = () => {
    const assetId = assets.map((asset) => asset.id);
    return coins.filter((coin: AssetType) => assetId.includes(coin.id));
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
        <div className="msg-wrapper">
          <Message
            msg="We couldn't find your coin, please try again."
            role={roleType.ERROR}
          />
        </div>
      ) : (
        coins.map((coin: CoinType) => {
          const owned = ownedCoins.some(
            (item: AssetType) => item.id === coin.id,
          );
          return <ListItem key={coin.id} coin={coin} owned={owned} />;
        })
      )}
    </section>
  );
};

export default AssetsList;
