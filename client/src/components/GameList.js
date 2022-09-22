import GameCard from "./GameCard"


function GameList({games, selectGame, currentUser}) {

    const gamesLimit = games.slice(0,51)

    const gameComponents = gamesLimit.map(game => {
        return <GameCard
        game={game}
        selectGame={selectGame}
        currentUser={currentUser}
        key={game.id}
        />
    })


    return (
        <div className=" p- rounded-lg shadow-sm shadow-indigo-100 flex flex-wrap">
            {gameComponents}
        </div>
    )
}

export default GameList