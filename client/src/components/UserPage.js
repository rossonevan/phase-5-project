import { useEffect, useState } from "react"


function UserPage({updateUser, currentUser, reviews}) {



    return (
        <article className="p-6 bg-white sm:p-4 sm:m-10 rounded-xl ring ring-blue-50">
            <h1 className="text-3xl border-b border-gray-400">Reviews:</h1>
            {currentUser.reviews.map(review => {
                return (
                    <div className="flex items-start">
                        <div class="sm:ml-8">                            
                            <h1 className="mt-4 text-lg text-grey-500 font-medium sm:text-xl">{review.game.title}</h1>
                            <h1 className="mt-1 text-sm text-grey-100">{review.comment}</h1>
                        </div>
                    </div>
                )
            })}         
        </article>
    )
}

export default UserPage