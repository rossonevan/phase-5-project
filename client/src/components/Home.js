import GameList from "./GameList"



function Home({games, selectGame}) {


    return (
        <div>
            <GameList games={games} selectGame={selectGame}/>
        </div>
    )
}

export default Home