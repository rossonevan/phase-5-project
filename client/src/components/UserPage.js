
function UserPage({currentUser, localGame}) {
    
    let i = 1

    const userReviewContainer = localGame.reviews?.map(review => {
        return (
            <>
            {currentUser.id === review.user.id ?
            (<div className=" items-start bg-white border rounded-md w-64 m-4">
                <div className="sm:ml-8">  
                        <h1 className="mt-4 text-lg text-black font-medium sm:text-2xl underline ">Review {i++}</h1>                          
                        <h1 className="mt-1 text-sm text-black mb-2 truncate">Comment: {review.comment}</h1>
                </div>
            </div>) : null }
            </>
        )
    }) 

    return (
        <article className="p-6 bg-gradient-to-br from-black to-gray-700 sm:p-4 sm:m-10 rounded-xl ring ring-blue-50">
            <h1 className="text-3xl border-b border-gray-400 text-white">Reviews of {localGame.title}</h1>
            <div className="flex flex-wrap">
            {userReviewContainer}
            </div>    
        </article>
    )
}

export default UserPage;