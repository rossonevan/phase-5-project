import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";


function GameDetail({selectedGame}) {

    console.log(selectedGame)
    
    const [getGame, setGetGame] = useState({})
    const [errors, setErrors] = useState(false)

    const setGame = (selectedGame) => {
        setGetGame(selectedGame)
    }

    const params = useParams()

    useEffect(() => {
        fetch(`/game/${params.id}`)
        .then(res =>{
            if(res.ok){
                res.json().then(data => {
                    setGame(data)
                })
            } else {
                res.json().then(data => setErrors(data.error))
            }
        })
    }, [params.id])


    console.log(getGame)

    return (
        <div>
            <h1>{selectedGame.title}</h1>
            <img src={selectedGame.thumbnail} alt={selectedGame.title}  />
            <p>Publisher: {selectedGame.publisher}</p>
            <p>Developer: {selectedGame.developer}</p>
            <h3>Platform: {selectedGame.platform}</h3> 
            <h3>Genre: {selectedGame.genre}</h3>
            <h4>Release Date: {selectedGame.release_date}</h4>
            <h4>Description: {selectedGame.short_description}</h4>
        </div>
    )
}

export default GameDetail