import GameList from "./GameList"



function Home({games}) {


    return (
        <div>
            <GameList games={games} />
        </div>
    )
}

export default Home