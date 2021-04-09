import { BASE_URL } from '../../constants/constant';
import { useFetch } from '../../useFetch';
//Components
//import HomeListItem from '../ListItem';
//import Loading from '../Loading';
//import Error from '../Error';

const HomeList = () => {
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
      {coins.map((coin) => {
        return <HomeListItem key={coin.id} coin={coin} />;
      })}
    </>
  );
};

export default HomeList;
