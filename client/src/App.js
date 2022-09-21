import './App.css';
import {Switch, Route} from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Navigation from './components/Navigation';
import GameDetail from './components/GameDetail';
import { useState, useEffect } from 'react';


function App() {

  // State of currently logged in user
  const [currentUser, setCurrentUser] = useState('');

  const updateUser = (user) => setCurrentUser(user)


  // GET all games from API
  const [gameData, setGameData] = useState([])
  const [errors, setErrors] = useState(false)
  
  // Selected Game for review
  const [selectedGame, setSelectedGame] = useState(false)

  const selectGame = (game) => {
    setSelectedGame(game)
  }


  useEffect(() => {
    fetch('/all-games')
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
    <div className="bg-gradient-to-b from-red-500 to-black bg-scroll bg-contain 
    overflow-auto m-auto h-screen w-screen">
      <header className='bg-black'>
        <Navigation currentUser={currentUser} updateUser={updateUser}/>
      </header>
      <Switch>
        <Route exact path='/'>
          <Home games={gameData} selectGame={selectGame} />
        </Route>
        <Route path='/game'>
          <GameDetail selectedGame={selectedGame} currentUser={currentUser}/>
        </Route>
        <Route path='/signup'>
          <Signup updateUser={updateUser} />
        </Route>
        <Route path='/login'>
          <Login updateUser={updateUser} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
