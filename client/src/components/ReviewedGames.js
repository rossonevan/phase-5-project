import LocalGameCard from "./LocalGameCard";



function ReviewedGames ({ localGames, reviews, currentUser, handleReviews, handleDelete, handlePatch, setSearch, handleFilterGenre}) {

    const onSearch = e=> {
        setSearch(e.target.value)
    }

    const onFilter = (e) => {
        handleFilterGenre(e.target.value)
    }

    const localGameComponents = localGames?.map(localGame => {
        return <LocalGameCard
        reviews = {reviews}
        localGame={localGame}
        currentUser={currentUser}
        handleReviews={handleReviews}
        handleDelete={handleDelete}
        handlePatch={handlePatch}
        key={localGame.id}
        />
    })

    return (
        <div>
            <div className="flow-root">
                <form className="float-left">  
                    <div className="relative m-4">
                        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                            <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        </div>
                        <input onChange={onSearch} type="search" className="block p-4 pl-10 w-96 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="Search Game..." />
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
            <h1 className='text-center text-6xl text-white underline italic' > Reviewed Games</h1>
            <div className="rounded-lg shadow-sm shadow-indigo-100 flex flex-wrap">
                {localGameComponents}
            </div>
        </div>
    )
}

export default ReviewedGames