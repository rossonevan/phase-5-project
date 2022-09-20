import './App.css';
import {Switch, Route} from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Navigation from './components/Navigation';
import { useState, useEffect } from 'react';


function App() {

  

  

  return (
    <div>
      <header >
        <Navigation />
      </header>
      <Switch>
        <Route exact path='/'>
          <Home games={gameData}/>
        </Route>
        <Route path='/signup'>
          <Signup />
        </Route>
        <Route path='/login'>
          <Login />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
