import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Homescreen from './components/Homescreen/Homescreen';
import Login from './components/Login/Login';
import Profile from './components/Profile/Profile';
import { useEffect } from 'react';
import { auth } from './firebase';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './features/userSlice';

const App = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();


  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        // logged in
        dispatch(
          login({
            uid: userAuth.uid,
            email: userAuth.email,
        })
      );

    } else {
        // logged out
        dispatch(logout());
      }
    });
    
    return unsubscribe;
  }, [dispatch]);

  return (
    <div className="app">
      <Router>
        {!user ? (
          <Login />
        ) : (
        <Switch>
          <Route path='/profile'>
            <Profile />
          </Route>
          <Route exact path="/">
            <Homescreen />
          </Route>
        </Switch>
        )}
      </Router>
    </div>
  );
}

export default App;