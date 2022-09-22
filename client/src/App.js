import './App.css';
import {Switch, Route} from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Navigation from './components/Navigation';
// import GameDetail from './components/GameDetail';
import UserPage from './components/UserPage';
import { useState, useEffect } from 'react';


function App() {


  // State of currently logged in user
  const [currentUser, setCurrentUser] = useState('');

  const updateUser = (user) => setCurrentUser(user)


  // GET all games from API
  const [gameData, setGameData] = useState([]);
  const [errors, setErrors] = useState(false);
  
  // Selected Game for review
  // const [selectedGame, setSelectedGame] = useState(false)

  // const selectGame = (game) => {
  //   setSelectedGame(game)
  // }


  useEffect(() => {
    fetch('/all_games')
      .then(res => {
        if(res.ok){
          res.json().then(setGameData)
        }else {
          res.json().then(data => setErrors(data.error))
        }
      })
    }, [])

    useEffect(() => {
      fetch(`/me`)
        .then(res => {
            if(res.ok){
                res.json().then(user => {
                    setCurrentUser(user);
                })
            } else {
                res.json().then(data => setErrors(data.error))
            }
        })
    }, [])




  if(errors) return <h1>{errors}</h1>

  return (
    <div className="bg-gradient-to-b from-red-500 to-black bg-scroll bg-contain 
    overflow-auto m-auto h-screen w-screen">
      <header className='bg-gradient-to-br from-black to-gray-700'>
        <Navigation currentUser={currentUser} updateUser={updateUser}/>
      </header>
      <Switch>
        <Route exact path='/'>
          <Home games={gameData} currentUser={currentUser}/>
        </Route>
        <Route path="/me">
          <UserPage currentUser={currentUser} updateUser={updateUser}/>
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
