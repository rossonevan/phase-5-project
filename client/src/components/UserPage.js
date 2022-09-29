import { useEffect } from "react"
import {useHistory} from 'react-router-dom';


function UserPage({currentUser}) {

    const history = useHistory()

    useEffect( () => {
        if (!currentUser) {
            fetch('/me')
            .then(res => {
                if (!res.ok) {
                    history.push('/login')
                }
            })
        }   
    }, [])

    console.log(currentUser)
    
    let i = 1

    return (
        <article className="p-6 bg-gradient-to-br from-black to-gray-700 sm:p-4 sm:m-10 rounded-xl ring ring-blue-50">
            <h1 className="text-3xl border-b border-gray-400 text-white">Reviews</h1>
            <div className="flex flex-wrap">
            {currentUser.reviews?.map(review => {
                return (
                    <div className="flex items-start bg-white border w-64 m-4">
                        <div className="sm:ml-8">  
                            <h1 className="mt-4 text-lg text-black font-medium sm:text-2xl underline ">Review {i++}</h1>                          
                            <h1 className="mt-2 text-lg text-black sm:text-lg">Game: {review.game.title}</h1>
                            <h1 className="mt-1 text-sm text-black mb-2">Comment: {review.comment}</h1>
                        </div>
                    </div>
                )
            })}  
            </div>       
        </article>
    )
}

export default UserPage