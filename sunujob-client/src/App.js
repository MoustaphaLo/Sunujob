import React, { Component, createContext, useEffect, useContext, useReducer } from 'react';
import './App.css';

import Accueil from "./components/accueil/Accueil";
import Register from './components/auth/Register';
import Login from "./components/auth/Login";


import { Provider } from 'react-redux';
import { BrowserRouter, BrowserRouter as Router, Route, Switch, useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Navigationbar from "./components/Navigation/Navigationbar";
import store from "./store";
import { useLocation } from "react-router-dom";
import Profil from './components/Profil/Profil';
import Message from './components/Messages/Message';
import Notifications from './components/Notifications/Notification'
import Footer from './components/footer/Footer';

export const UserContext = createContext()

const initialState = null

const Routing = () => {
  const history = useHistory()
  const { state, dispatch } = useContext(UserContext)
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"))
    if (user) {
      dispatch({ type: "User", payload: user })
    } else {
      if (!history.location.pathname.startsWith('/login'))
        history.push('/login')
    }
  }, [])
  return (
    <div>
      <Provider store={store}>

        <Router>
          <Switch>
            <PrivateRoute component={Navigationbar} />
            <PrivateRoute component={Footer} />
          </Switch>
          <div className="App">
            <Route exact path="/" component={Accueil} />

            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />

            <Switch>
              <PrivateRoute exact path="/accueil" component={Accueil} />
              <PrivateRoute exact path="/profil/" component={Profil} />
              <PrivateRoute exact path="/notifications" component={Notifications} />
              <PrivateRoute exact path="/messages" component={Message} />
            </Switch>
          </div>
        </Router>
      </Provider>
    </div>
  )
}

if (localStorage.jwtToken) {
  const token = localStorage.jwtToken;
  setAuthToken(token);
  const decoded = jwt_decode(token);
  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());

    window.location.href = "./login";
  }
}


class App extends Component {

  constructor(props) {
    super(props);
  }
  render() {
    //const [state, dispatch] = useReducer(reducer, initialState)
    return (
      /*<UserContext.Provider value={{ state, dispatch }}>
        <BrowserRouter>
          <Navigationbar />
          <Routing />
        </BrowserRouter>
      </UserContext.Provider>*/
      <div>
        <Provider store={store}>

          <Router>
            <Switch>
              <PrivateRoute component={Navigationbar} />
              <PrivateRoute component={Footer} />
            </Switch>
            <div className="App">
              <Route exact path="/" component={Accueil} />

              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />

              <Switch>
                <PrivateRoute exact path="/accueil" component={Accueil} />
                <PrivateRoute exact path="/profil/" component={Profil} />
                <PrivateRoute exact path="/notifications" component={Notifications} />
                <PrivateRoute exact path="/messages" component={Message} />
              </Switch>
            </div>
          </Router>
        </Provider>
      </div>
    );
  }
}

export default App;
