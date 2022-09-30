import GameCard from "./GameCard"
import {useEffect, useState} from 'react';


function GameList({games, currentUser, handleReviews, setLocalGames, change, setChange, setSearch}) {
    
    const onSearch = e=> {
        setSearch(e.target.value)
    }
    
    const gamesLimit = games.slice(0,51)

    const gameComponents = gamesLimit.map(game => {
        return <GameCard
        game={game}
        currentUser={currentUser}
        handleReviews={handleReviews}
        setLocalGames={setLocalGames}
        change={change}
        setChange={setChange}
        key={game.id}
        />
    })
            
    return (
        <div>
            <form>
                <input onChange={onSearch} type='text' placeholder="Search by title..." />
            </form>
            <div className=" p- rounded-lg shadow-sm shadow-indigo-100 flex flex-wrap">
                {gameComponents}
            </div>
        </div>
    )
}

export default GameList