import GameCard from "./GameCard"

function GameList({reviews, games, currentUser, handleReviews, handleFirstReview, setLocalGames, setSearch, handleFilterGenre}) {
    
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
        reviews={reviews}
        currentUser={currentUser}
        handleFirstReview={handleFirstReview}
        handleReviews={handleReviews}
        setLocalGames={setLocalGames}
        key={game.id}
        />
    })
            
    return (
        <div>
            <div className="flow-root">
                <form className="float-left">  
                    <div className="relative m-4">
                        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                            <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        </div>
                        <input onChange={onSearch} type="search" className="block p-4 pl-10 w-96 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:bg-gray-300" placeholder="Search Game..." />
                    </div>
                </form>
                <div className="m-4">
                    <label className='text-white text-xl'>Search Genre: </label>
                    <select className='rounded m-4' onChange={onFilter}>
                        <option value="default">All Games</option>
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
                </div>
            </div>
            <div className=" p- rounded-lg shadow-sm shadow-indigo-100 flex flex-wrap">
                {gameComponents}
            </div>
        </div>
    )
}

export default GameList