import './App.css';
import {Switch, Route} from 'react-router-dom';
import GameList from './components/GameList';
import Login from './components/Login';
import Signup from './components/Signup';
import Navigation from './components/Navigation';
import UserPage from './components/UserPage';
import { useState, useEffect } from 'react';
import ReviewedGames from './components/ReviewedGames';


function App() {

  const [change, setChange] = useState(false)

  // State of currently logged in user
  const [currentUser, setCurrentUser] = useState('');
  const [reviews, setReviews] = useState([])

  const updateUser = (user) => setCurrentUser(user)

  // GET all games from API
  const [gameData, setGameData] = useState([]);
  const [errors, setErrors] = useState(false);

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
              res.json().then(setCurrentUser)
          } else {
              res.json().then(data => setErrors(data.error))
          }
      })
  }, [])

  // GET all reviews
  useEffect(() => {
    fetch('/reviews')
    .then(res => res.json())
    .then(setReviews)
  }, [])

  //Add new Review to database
  const handleReviews = (newReview) => {
    setReviews(reviews => [...reviews, newReview])
  }


  const handleDelete = (reviewToDelete) => {
    const updatedReviews = reviews.filter(review => review.id !== reviewToDelete.id)
    setReviews(updatedReviews)
  }

  const handlePatch = (updatedReview) => {
    const updatedReviews = reviews.map((review) =>
        review.id === updatedReview.id ? updatedReview : review
    )
    setReviews(updatedReviews)
  }

  //GET games from local database
  const [localGames, setLocalGames] = useState([])

  
  useEffect(() => {
    fetch('/games')
    .then(res => res.json())
    .then(setLocalGames)
  }, [change])
 

  if(errors) return <h1>{errors}</h1>

  return (
    <div className="bg-gradient-to-b from-red-500 to-black bg-scroll bg-contain 
    overflow-auto m-auto h-screen w-screen">
      <header className='bg-gradient-to-br from-black to-gray-700'>
        <Navigation currentUser={currentUser} updateUser={updateUser}/>
      </header>
      <Switch>
        <Route exact path='/'>
          <GameList games={gameData} currentUser={currentUser} handleReviews={handleReviews} change={change} setChange={setChange}/>
        </Route>
        <Route path='/reviewed_games'>
          <ReviewedGames localGames={localGames} reviews ={reviews} currentUser={currentUser} handleReviews={handleReviews} handleDelete={handleDelete} handlePatch={handlePatch} change={change} setChange={setChange}/>
        </Route>
        <Route path="/me">
          <UserPage currentUser={currentUser} />
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
