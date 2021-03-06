import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutuser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";

import './App.css';
import Navbar from "./components/layout/Navbar";
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from "./components/dashboard/Dashboard";
import { clearCurrentProfile } from './actions/profileActions';
import PrivateRoute from './components/common/PrivateRoute';
import CreateProfile from './components/create-profile/CreateProfile';
import EditProfile from './components/editProfile/EditProfile';
import AddExperience from './components/add-credentials/AddExperience';
import AddEducation from './components/add-credentials/AddEducation';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import NotFound from './components/not-found/NotFound';
import PostForm from './components/posts/PostForm';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';

// check token 

if(localStorage.jwtToken){
  //set auth token header auth 
  setAuthToken(localStorage.jwtToken);
  // decode token and get user and experire
  const decoded = jwt_decode(localStorage.jwtToken);

  // set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded)); 

  //check for expire token 
  const currentTime = Date.now() / 1000;

  if(decoded.exp < currentTime){
    //logged user back
    store.dispatch(logoutuser());

    //clear current user
    store.dispatch(clearCurrentProfile());
    
    // redirect user to /login
    window.locaton.href = "/login"
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar/>
            <Route exact path="/" component={Landing}/>
            <div className="container">
              <Route exact path="/register" component={Register}/>
              <Route exact path="/login" component={Login}/>
              <Route exact path="/profiles" component={Profiles}/>
              <Switch>
                <PrivateRoute exact path="/profile/:handle" component={Profile}/>
              </Switch>
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard}/>
              </Switch>
              <Switch>
                <PrivateRoute exact path="/create-profile" component={CreateProfile}/>
              </Switch>
              <Switch>
                <PrivateRoute exact path="/edit-profile" component={EditProfile}/>
              </Switch>
              <Switch>
                <PrivateRoute exact path="/add-experience" component={AddExperience}/>
              </Switch>
              <Switch>
                <PrivateRoute exact path="/add-education" component={AddEducation}/>
              </Switch>
              <Switch>
                <PrivateRoute exact path="/feed" component={Posts}/>
              </Switch>
              <Switch>
                <PrivateRoute exact path="/post/:id" component={Post}/>
              </Switch>
              <Route exact path="/not-found" component={NotFound}/>
            </div>
            <Footer/>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
