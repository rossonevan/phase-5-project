import GameList from "./GameList"



function Home({games, selectGame, currentUser}) {


    return (
        <div>
            <GameList games={games} selectGame={selectGame} currentUser={currentUser}/>
        </div>
    )
}

export default Home