import GameList from "./GameList"



function Home({games, currentUser}) {


    return (
        <div>
            <GameList games={games} currentUser={currentUser}/>
        </div>
    )
}

export default Home