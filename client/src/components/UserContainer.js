import { useEffect } from "react"
import {useHistory} from 'react-router-dom';
import UserPage from "./UserPage";

function UserContainer ({currentUser, localGames}) {

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

    const gameReviews = localGames.map(localGame => {
        return <UserPage 
        currentUser={currentUser}
        localGame={localGame}
        key={localGame.id}
        />
    })

    return (
        <div >
            <article className="p-6 bg-gradient-to-br from-black to-gray-700 sm:p-4 sm:m-10 rounded-xl">
                <h1 className="text-3xl border-b border-gray-400 text-white">Reviews</h1>
                <div className="flex flex-wrap">
                {gameReviews}
                </div>
            </article>
        </div>
    )
}

export default UserContainer;