import {useState} from 'react';



function GameCard({game, currentUser}) {

    const [showForm, setShowForm] = useState(false)
    const [form, setForm] = useState({})
     const [showReviews, setShowReviews] = useState(false)

    const toggleReviews = () => {
        setShowReviews(showReviews => !showReviews)
    }

    const userInput = e => {
        setForm( pF => ({...pF, [e.target.name]: e.target.value}))
    }

    const addReview = e => {
        e.preventDefault()

        const infoToSend = {
            ...form,
            ...game
        }


        fetch('/reviews', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(infoToSend)
        }).then(res => res.json())
        .then(console.log)
    }


        const showReviewForm = () => {
            return (
            <div>
            {showForm ? 
                <form className='text-black' onSubmit={addReview}>
                    <input type='text' onChange={userInput} name='comment' placeholder='Comment'/>
                    <input type='number' onChange={userInput} name='rating' placeholder='Rating'/>
                    <input type='submit' />
                </form>
            :
            null}
            </div>
        )}


    return (


        <div className=" bg-gradient-to-br from-black to-gray-700 sm:p-4 sm:m-20 rounded-xl w-1/4 text-white">
            <h1 className="text-center font-bold">{game.title}</h1>
            <img src={game.thumbnail} alt={game.title} />
            <h3>Platform: {game.platform}</h3> 
            <h3>Genre: {game.genre}</h3>
            <button onClick={toggleReviews}>Show Reviews</button>
            {showReviews ? <div><h1>Reviews</h1></div> : null}
            <br></br>
            {currentUser ? showReviewForm() : null}
            {showForm ? (<button onClick={() => setShowForm(!showForm)}>Cancel</button>) : (<button onClick={() => setShowForm(!showForm)}>Add A Review</button>)}
        </div>
    )
}

export default GameCard