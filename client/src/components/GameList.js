import GameCard from "./GameCard"


function GameList({games, selectGame}) {

    const gamesLimit = games.slice(0,10)

    const gameComponents = gamesLimit.map(game => {
        return <GameCard
        game={game}
        selectGame={selectGame}
        key={game.id}
        />
    })


    return (
        <div>
            {gameComponents}
        </div>
    )
}

export default GameList