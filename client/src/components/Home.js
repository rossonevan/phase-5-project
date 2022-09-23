import GameList from "./GameList"



function Home({games, currentUser, handleReviews, localGames}) {


    return (
        <div>
            <GameList games={games} currentUser={currentUser} handleReviews={handleReviews} localGames={localGames}/>
        </div>
    )
}

export default Home