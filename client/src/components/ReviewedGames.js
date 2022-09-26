import LocalGameCard from "./LocalGameCard"



function ReviewedGames ({ localGames, reviews, currentUser, handleReviews, handleDelete, handlePatch}) {


    const localGameComponents = localGames.map(localGame => {
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
        <div className=" p- rounded-lg shadow-sm shadow-indigo-100 flex flex-wrap">
            {localGameComponents}
        </div>
    )
}

export default ReviewedGames