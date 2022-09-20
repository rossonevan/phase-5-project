import './App.css';
import {Switch, Route} from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Navigation from './components/Navigation';
import GameDetail from './components/GameDetail';
import { useState, useEffect } from 'react';


function App() {

  // GET all games from API
  const [gameData, setGameData] = useState([])
  const [errors, setErrors] = useState(false)
  
  // Selected Game for review
  const [selectedGame, setSelectedGame] = useState(false)

  const selectGame = (game) => {
    setSelectedGame(game)
  }


  useEffect(() => {
    fetch('/test')
      .then(res => {
        if(res.ok){
          res.json().then(setGameData)
        }else {
          res.json().then(data => setErrors(data.error))
        }
      })
    }, [])

  console.log(selectedGame)

  return (
    <div>
      <header >
        <Navigation />
      </header>
      <Switch>
        <Route exact path='/'>
          <Home games={gameData} selectGame={selectGame} />
        </Route>
        <Route path='games/id'>
          <GameDetail selectedGame={selectedGame} />
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
