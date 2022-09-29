import LocalGameCard from "./LocalGameCard";



function ReviewedGames ({ localGames, reviews, currentUser, handleReviews, handleDelete, handlePatch, change, setChange}) {



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
            <h1 className='text-center text-6xl text-white underline italic' > Reviewed Games</h1>
            <div className="p- rounded-lg shadow-sm shadow-indigo-100 flex flex-wrap">
                {localGameComponents}
            </div>
        </div>
    )
}

export default ReviewedGames