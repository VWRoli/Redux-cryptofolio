import { BASE_URL } from '../../constants/constant';
import { useFetch } from '../../hooks/useFetch';
import { CoinType } from '../../Types';
//Components
import ListItem from '../common/ListItem/ListItem';
import Loading from '../common/Loading/Loading';
import Error from '../common/Error/Error';

const HomeList: React.FC = (): JSX.Element => {
  const { data: coins, isLoading, isError } = useFetch(BASE_URL);

  //Loading screen
  if (isLoading) {
    return <Loading />;
  }

  //Error screen
  if (isError) {
    return (
      <Error msg="Error fetching data, please refresh the page or try again later..." />
    );
  }
  return (
    <>
      {coins.map((coin: CoinType) => {
        return <ListItem key={coin.id} coin={coin} />;
      })}
    </>
  );
};

export default HomeList;
