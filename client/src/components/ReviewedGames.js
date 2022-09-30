import LocalGameCard from "./LocalGameCard";



function ReviewedGames ({ localGames, reviews, currentUser, handleReviews, handleDelete, handlePatch, change, setChange, setSearch}) {

    const onSearch = e=> {
        setSearch(e.target.value)
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
            <h1 className='text-center text-6xl text-white underline italic' > Reviewed Games</h1>
            <div className="p- rounded-lg shadow-sm shadow-indigo-100 flex flex-wrap">
                {localGameComponents}
            </div>
        </div>
    )
}

export default ReviewedGames