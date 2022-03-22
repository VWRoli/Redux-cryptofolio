import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { State } from './reducers';
import { lazy, Suspense } from 'react';

//Components
import AddAsset from './components/AddAsset/AddAsset';
import NotFound from './components/NotFound/NotFound';
import Home from './components/Home/Home';
//import Modal from './components/Modal/Modal';
import Portfolio from './components/Portfolio/Portfolio';

const ModalComponent = lazy(() => import('./components/Modal/Modal'));

const App: React.FC = (): JSX.Element => {
  const assets = useSelector((state: State) => state.asset.assets);

  return (
    <Router>
      <div className="App">
        <Suspense fallback={<></>}>
          <ModalComponent />
        </Suspense>
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
            <NotFound />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
