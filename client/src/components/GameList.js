import GameCard from "./GameCard"
import {useEffect, useState} from 'react';


function GameList({games, currentUser, handleReviews, localGames, setChange, change}) {
    
    const gamesLimit = games.slice(0,51)

    const gameComponents = gamesLimit.map(game => {
        return <GameCard
        game={game}
        currentUser={currentUser}
        handleReviews={handleReviews}
        localGames={localGames}
        setChange={setChange}
        change={change}
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