import GameCard from "./GameCard"
import LocalGameCard from "./LocalGameCard";
import {useEffect, useState} from 'react';


function GameList({games, currentUser, handleReviews, localGames}) {
    
    const gamesLimit = games.slice(0,5)

    const gameComponents = gamesLimit.map(game => {
        return <GameCard
        game={game}
        currentUser={currentUser}
        handleReviews={handleReviews}
        key={game.id}
        />
    })

    const localGameComponents = localGames.map(localGame => {
        return <LocalGameCard
        localGame={localGame}
        currentUser={currentUser}
        handleReviews={handleReviews}
        key={localGame.id}
        />
    })
            

    return (
        <div className=" p- rounded-lg shadow-sm shadow-indigo-100 flex flex-wrap">
            {gameComponents}
            {localGameComponents}
        </div>
    )
}

export default GameList