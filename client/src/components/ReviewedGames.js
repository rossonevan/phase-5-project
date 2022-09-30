import LocalGameCard from "./LocalGameCard";



function ReviewedGames ({ localGames, reviews, currentUser, handleReviews, handleDelete, handlePatch, change, setChange, setSearch, handleFilterGenre}) {

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
        change={change} 
        setChange={setChange}
        key={localGame.id}
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
            <h1 className='text-center text-6xl text-white underline italic' > Reviewed Games</h1>
            <div className="p- rounded-lg shadow-sm shadow-indigo-100 flex flex-wrap">
                {localGameComponents}
            </div>
        </div>
    )
}

export default ReviewedGames