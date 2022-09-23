import './App.css';
import {Switch, Route} from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Navigation from './components/Navigation';
// import GameDetail from './components/GameDetail';
import UserPage from './components/UserPage';
import { useState, useEffect } from 'react';
import GameCard from './components/GameCard';


function App() {


  // State of currently logged in user
  const [currentUser, setCurrentUser] = useState('');
  const [reviews, setReviews] = useState([])

  const updateUser = (user) => setCurrentUser(user)

  // GET all games from API
  const [gameData, setGameData] = useState([]);
  const [errors, setErrors] = useState(false);
  
  // Selected Game for review
  // const [selectedGame, setSelectedGame] = useState(false)

  // const selectGame = (game) => {
  //   setSelectedGame(game)
  // }

  // GET all games from API
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

  // Set currently logged in state
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

  // GET all reviews
  useEffect(() => {
    fetch('/reviews')
    .then(res => res.json())
    .then(data => setReviews(data))
  }, [])

  //Add new Review to database
  const handleReviews = (addedReview) => {
    setReviews(oldReviews => [...oldReviews, addedReview])
  }

  // const renderNewReviews = (newReview) => {
  //   const newState = reviews.map(obj => {
  //     if(obj.id === newReview.id) {
  //       obj.reviews.push(newReview)
  //     }
  //     return obj;
  //   })
  //   setReviews(newState)
  // }

  //GET games from local database
  const [localGames, setLocalGames] = useState([])

  useEffect(() => {
    fetch('/games')
    .then(res => res.json())
    .then(data => setLocalGames(data))
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
          <Home games={gameData} currentUser={currentUser} handleReviews={handleReviews} localGames={localGames}/>
        </Route>
        <Route path="/me">
          <UserPage currentUser={currentUser} updateUser={updateUser} reviews={reviews}/>
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
