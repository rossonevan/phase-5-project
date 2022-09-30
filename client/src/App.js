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
  }, [change])

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

  // Filter games for search
  const [search, setSearch] = useState('')
  const filteredGameData = gameData.filter(game => game.title.toLowerCase().includes(search.toLowerCase()))

  const filteredLocalGames = localGames.filter(localGame => localGame.title.toLowerCase().includes(search.toLowerCase()))

  //Dropdown menu to search by genre
  const [filterGenre, setFilterGenre] = useState(false)

  const handleFilterGenre = (filterGenre) => {
    setFilterGenre(filterGenre)
  }

const sortedGameData = () => {
    if (filterGenre === "shooter") {
        return filteredGameData.filter( game => game.genre.includes('Shooter')
    )} else if (filterGenre === "mmorpg") {
        return filteredGameData.filter( game => game.genre.includes('MMORPG')
    )} else if (filterGenre === "fighting") {
        return filteredGameData.filter( game => game.genre.includes('Fighting')
    )} else if (filterGenre === "moba") {
        return filteredGameData.filter( game => game.genre.includes('MOBA')
    )} else if (filterGenre === "sports") {
        return filteredGameData.filter( game => game.genre.includes('Sports')
    )} else if (filterGenre === "battle_royale") {
        return filteredGameData.filter( game => game.genre.includes('Battle Royale')
    )} else if (filterGenre === "card_game") {
        return filteredGameData.filter( game => game.genre.includes('Card Game')
    )} else if (filterGenre === "mmofps") {
        return filteredGameData.filter( game => game.genre.includes('MMOFPS')
    )} else if (filterGenre === "arpg") {
        return filteredGameData.filter( game => game.genre.includes('ARPG')
    )} else if (filterGenre === "strategy") {
        return filteredGameData.filter( game => game.genre.includes('Strategy')
    )} else
        return filteredGameData
}
  
const sortedLocalGames = () => {
  if (filterGenre === "shooter") {
      return filteredLocalGames.filter( game => game.genre.includes('Shooter')
  )} else if (filterGenre === "mmorpg") {
      return filteredLocalGames.filter( game => game.genre.includes('MMORPG')
  )} else if (filterGenre === "fighting") {
      return filteredLocalGames.filter( game => game.genre.includes('Fighting')
  )} else if (filterGenre === "moba") {
      return filteredLocalGames.filter( game => game.genre.includes('MOBA')
  )} else if (filterGenre === "sports") {
      return filteredLocalGames.filter( game => game.genre.includes('Sports')
  )} else if (filterGenre === "battle_royale") {
      return filteredLocalGames.filter( game => game.genre.includes('Battle Royale')
  )} else if (filterGenre === "card_game") {
      return filteredLocalGames.filter( game => game.genre.includes('Card Game')
  )} else if (filterGenre === "mmofps") {
      return filteredLocalGames.filter( game => game.genre.includes('MMOFPS')
  )} else if (filterGenre === "arpg") {
      return filteredLocalGames.filter( game => game.genre.includes('ARPG')
  )} else if (filterGenre === "strategy") {
      return filteredLocalGames.filter( game => game.genre.includes('Strategy')
  )} else
      return filteredLocalGames
} 
  
  
  if(errors) return <h1>{errors}</h1>

  return (
    <div className="bg-gradient-to-b from-red-500 to-black bg-scroll bg-contain 
    overflow-auto m-auto h-screen w-screen">
      <header className='bg-gradient-to-br from-black to-gray-700'>
        <Navigation currentUser={currentUser} updateUser={updateUser} setSearch={setSearch}/>
      </header>
      <Switch>
        <Route exact path='/'>
          <GameList 
          handleReviews={handleReviews}
          reviews={reviews} 
          handleFilterGenre={handleFilterGenre} 
          setSearch={setSearch} 
          games={sortedGameData()} 
          currentUser={currentUser}  
          change={change} 
          setChange={setChange}/>
        </Route>
        <Route path='/reviewed_games'>
          <ReviewedGames 
          handleFilterGenre={handleFilterGenre} 
          setSearch={setSearch} 
          localGames={sortedLocalGames()} 
          reviews ={reviews} 
          currentUser={currentUser} 
          handleDelete={handleDelete} 
          handlePatch={handlePatch} 
          change={change} 
          setChange={setChange}/>
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
