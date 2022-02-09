import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { AssetStateType } from './reducers/asset';
//Components
import AddAsset from './components/AddAsset/AddAsset';
import ErrorPage from './components/ErrorPage';
import Home from './components/Home/Home';
import Modal from './components/Modal/Modal';
import Portfolio from './components/Portfolio/Portfolio';
import { AssetType } from './actions/assetActions';

const mapStateToProps = (state: AssetStateType) => ({
  //todo assets: state.asset.assets,
});

type Props = {
  assets?: AssetType[];
};
const App: React.FC<Props> = ({ assets }): JSX.Element => {
  return (
    <Router>
      <div className="App">
        <Modal />
        <Switch>
          <Route exact path="/">
            {assets?.length === 0 ? <Home /> : <Portfolio />}
          </Route>
          <Route path="/addasset">
            <AddAsset />
          </Route>
          <Route path="/portfolio">
            <Portfolio />
          </Route>
          <Route path="*">
            <ErrorPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default connect(mapStateToProps)(App);
