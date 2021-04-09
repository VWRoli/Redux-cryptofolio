import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

//Components
//import AddAsset from './components/AddAsset/AddAsset';
import ErrorPage from './components/ErrorPage';
import Home from './components/Home/Home';
//import Modal from './components/Modal';
//import Portfolio from './components/Portfolio/Portfolio';

function App({ assets }) {
  return (
    <Router>
      <div className='App'>
        {/*  <Modal /> */}
        <Switch>
          <Route exact path='/'>
            {assets.length === 0 ? <Home /> : null /*  <Portfolio /> */}
          </Route>
          <Route path='/addasset'>{/*   <AddAsset /> */}</Route>
          <Route path='/portfolio'>{/*   <Portfolio /> */}</Route>
          <Route path='*'>
            <ErrorPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

const mapStateToProps = (state) => {
  return {
    assets: state.asset.assets,
  };
};

export default connect(mapStateToProps)(App);
