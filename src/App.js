import './App.css';
import { Route, Switch } from "react-router-dom";
import Home from './containers/Home';
import Signin from './containers/Signin';
import Signup from './containers/Signup';
import Header from './components/Header';
import PrivateRoute from './components/HOC/PivateRoute';
import { useEffect } from 'react';
import { getAllCategories, isUserLoggedIn } from './actions';
import { useDispatch, useSelector } from 'react-redux';
import Products from './containers/Products';
import { Container } from 'react-bootstrap';
import Orders from './containers/Orders';
import Category from './containers/Category';

function App() {

  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth.authData);

  useEffect(() => {
      if(!auth?.user)
          dispatch(isUserLoggedIn());
        
      dispatch(getAllCategories());
  }, []);

  return (
    <div className="App">
        <Header />
        <Switch>
          <PrivateRoute path="/" exact component={Home} />
          <PrivateRoute path="/products" component={Products} />
          <PrivateRoute path="/orders" component={Orders} />
          <PrivateRoute path="/category" component={Category} />

          <Route path="/signin" component={Signin} />
          <Route path="/signup" component={Signup} />
        </Switch>
    </div>
  );
}

export default App;
