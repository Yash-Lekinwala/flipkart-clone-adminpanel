import './App.css';
import { Route, Switch } from "react-router-dom";
import Home from './containers/Home';
import Signin from './containers/Signin';
import Signup from './containers/Signup';
import Header from './components/Header';
import PrivateRoute from './components/HOC/PivateRoute';
import { useEffect } from 'react';
import { isUserLoggedIn } from './actions';
import { useDispatch, useSelector } from 'react-redux';

function App() {

  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth.authData);

  useEffect(() => {
      if(!auth?.user)
          dispatch(isUserLoggedIn());
  }, []);

  return (
    <div className="App">
        <Header />
        <Switch>
          <PrivateRoute path="/" exact component={Home} />
          <Route path="/signin" component={Signin} />
          <Route path="/signup" component={Signup} />
        </Switch>
    </div>
  );
}

export default App;
