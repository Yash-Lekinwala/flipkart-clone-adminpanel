import './App.css';
import { Route, Switch } from "react-router-dom";
import Home from './containers/Home';
import Signin from './containers/Signin';
import Signup from './containers/Signup';
import Header from './components/Header';
import PrivateRoute from './components/HOC/PivateRoute';
import { useEffect } from 'react';
import { getInitialData, isUserLoggedIn } from './actions';
import { useDispatch, useSelector } from 'react-redux';
import Products from './containers/Products';
import Orders from './containers/Orders';
import Category from './containers/Category';
import NewPage from './containers/NewPage';

function App() {

  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth.authData);

  useEffect(() => {
      if(!auth?.user)
        dispatch(isUserLoggedIn());
        
      if(auth?.user)
        dispatch(getInitialData());
  }, [auth?.user]);

  return (
    <div className="App">
        <Header />
        <Switch>
          <PrivateRoute path="/" exact component={Home} />
          <PrivateRoute path="/products" component={Products} />
          <PrivateRoute path="/page" component={NewPage} />
          <PrivateRoute path="/orders" component={Orders} />
          <PrivateRoute path="/category" component={Category} />

          <Route path="/signin" component={Signin} />
          <Route path="/signup" component={Signup} />
        </Switch>
    </div>
  );
}

export default App;
