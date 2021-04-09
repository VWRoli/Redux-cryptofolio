import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Provider } from 'react-redux';
import { store } from './store';

//Components
import AddAsset from './components/AddAsset/AddAsset';
import ErrorPage from './components/ErrorPage';
import Home from './components/Home/Home';
import Modal from './components/Modal';
import Portfolio from './components/Portfolio/Portfolio';

function App() {
  //const { assets } = useGlobalContext();

  return (
    <Provider store={store}>
      <Router>
        <div className='App'>
          <Modal />
          <Switch>
            <Route exact path='/'>
              {assets.length === 0 ? <Home /> : <Portfolio />}
            </Route>
            <Route path='/addasset'>
              <AddAsset />
            </Route>
            <Route path='/portfolio'>
              <Portfolio />
            </Route>
            <Route path='*'>
              <ErrorPage />
            </Route>
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
