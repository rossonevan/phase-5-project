
function UserPage({currentUser, localGame}) {
    
    let i = 1

    const userReviewContainer = localGame.reviews?.map(review => {
        
        return (
            <>
            {currentUser.id === review.user.id ?
            (<div className=" items-start bg-white border rounded-md w-auto m-4">
                <div className="sm:ml-2">  
                        <h1 className="mt-2 text-lg text-black font-medium sm:text-2xl underline pr-4">Review of {review.game?.title}</h1>                          
                        <h1 className="mt-1 text-sm text-black mb-2 pt-2 pr-4">Comment: {review.comment}</h1>
                </div>
            </div>) : null }
            </>
        )
    }) 

    return (
       <div>
            {userReviewContainer}
        </div>    
    )
}

export default UserPage;