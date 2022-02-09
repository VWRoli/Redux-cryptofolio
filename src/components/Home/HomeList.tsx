import { BASE_URL } from '../../constants/constant';
import { useFetch } from '../../useFetch';
//Components
import ListItem from '../ListItem';
import Loading from '../Loading';
import Error from '../Error';
import { AssetType } from '../../actions/assetActions';

const HomeList: React.FC = (): JSX.Element => {
  const { data: coins, isLoading, isError } = useFetch(BASE_URL);

  //Loading screen
  if (isLoading) {
    return <Loading />;
  }

  //Error screen
  if (isError) {
    return <Error />;
  }
  return (
    <>
      {coins.map((coin: AssetType) => {
        return <ListItem key={coin.id} coin={coin} />;
      })}
    </>
  );
};

export default HomeList;
