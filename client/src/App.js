import './App.css';
import {Switch, Route} from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Navigation from './components/Navigation';
import { useState, useEffect } from 'react';


function App() {

  const [gameData, setGameData] = useState([])
  const [errors, setErrors] = useState(false)

  const url = 'https://free-to-play-games-database.p.rapidapi.com/api/games?platform=pc';


  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '12d1e78ce1msh7a2050bab569fb9p1ecfc1jsnc3e4747b45e0',
      'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
    }
  };

  useEffect(() => {
    fetch(url, options)
      .then(res => {
        if(res.ok){
          res.json().then(setGameData)
        }else {
          res.json().then(data => setErrors(data.error))
        }
      })
    }, [])




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
