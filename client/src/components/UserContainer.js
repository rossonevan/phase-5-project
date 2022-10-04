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
        <div>
            {gameReviews}
        </div>
    )
}

export default UserContainer;