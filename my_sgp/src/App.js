import './App.css';
import Navbar from './components/Navbar';
import {Switch ,Route } from "react-router-dom";
import HomePage from './HomePage';
import Signup from './Signup';
import Login from './Login';
import ResetPassword from './ResetPassword';
import Profile from './Profile';
import Prediction from './components/Prediction';
import { useState } from 'react';
import EditProfile from './EditProfile';
function App() {
  const [Auth,setAuth]=useState(true);
  
  return (
    <div className="App">
      <Navbar isAuth={Auth} />
      
      <Switch>
        <Route path="/" component={HomePage} exact/>
        <Route path="/Signup" component={Signup} exact />
        <Route path="/Login" component={Login} exact />
        <Route path="/ResetPassword" component={ResetPassword} exact />
        <Route path="/Profile" component={Profile} exact />
        <Route path="/Prediction" component={Prediction} exact />
        <Route path="/EditProfile" component={EditProfile} exact />
      </Switch>
    </div>
  );
}

export default App;
