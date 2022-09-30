import GameCard from "./GameCard"
import {useEffect, useState} from 'react';


function GameList({games, currentUser, handleReviews, setLocalGames, change, setChange, setSearch, handleFilterGenre}) {
    
    const onSearch = (e) => {
        setSearch(e.target.value)
    }

    const onFilter = (e) => {
        handleFilterGenre(e.target.value)
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
            <label className=''>Search Genre: </label>
            <select className='' onChange={onFilter}>
                <option value='default'>All Games</option>
                <option value="shooter">Shooter</option>
                <option value="mmorpg">MMORPG</option>
                <option value="fighting">Fighting</option>
                <option value="moba">MOBA</option>
                <option value="battle_royale">Battle Royale</option>
                <option value="card_game">Card Game</option>
                <option value="mmofps">MMOFPS</option>
                <option value="arpg">ARPG</option>
                <option value="strategy">Strategy</option>
            </select>
            <div className=" p- rounded-lg shadow-sm shadow-indigo-100 flex flex-wrap">
                {gameComponents}
            </div>
        </div>
    )
}

export default GameList