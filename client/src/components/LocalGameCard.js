import {useEffect, useState} from 'react';
import EditForm from './EditForm';



function LocalGameCard({ localGame, currentUser, handleReviews, handleDelete, handlePatch, getLocalGames}) {

    const [showForm, setShowForm] = useState(false)
    const [form, setForm] = useState({})
    const [showReviews, setShowReviews] = useState(false)


    const handleRemove = (id) => {
        fetch(`/reviews/${id}`, {
            method: "DELETE",
        })
        .then(() => handleDelete());
    }

    const toggleReviews = () => {
        setShowReviews(showReviews => !showReviews)
    }

    // List of Reviews
    const reviewList = localGame.reviews.map( review => {
        return (
            <div>
                <h4>{review.user.username}</h4>
                <p>{review.comment}</p>
                <p>{review.rating}</p>
                {currentUser.id === review.user.id ?
                (<div>
                    <EditForm handlePatch={handlePatch} review={review} />
                    <button onClick={() => handleRemove(review.id) }>Remove Review</button>
                </div>) : null}
            </div>
        )
    })
        
    const userInput = e => {
        setForm( pF => ({...pF, [e.target.name]: e.target.value}))
    }

    const addReview = e => {
        e.preventDefault()
        const infoToSend = {
            ...form,
            ...localGame
        }

        // POST a review
        fetch('/reviews', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(infoToSend)
        }).then(res => res.json())
        .then(data => handleReviews(data), getLocalGames())
        e.target.reset()
    }

        // Toggle Add Review Form
    const showReviewForm = () => {
        return (
        <div>
        {showForm ? 
            <form className='text-black' onSubmit={addReview}>
                <input type='text' onChange={userInput} name='comment' placeholder='Comment'/>
                <input type='number' onChange={userInput} name='rating' placeholder='Rating'/>
                <input type='submit' className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"/>
            </form>
        :
        null}
        </div>
    )}

    // Add Review Button
    const showAddReviewButton = () => {
        return (
            <>
            {showForm ? (<button onClick={() => setShowForm(!showForm)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full">Cancel</button>) : (<button onClick={() => setShowForm(!showForm)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full">Add A Review</button>)}
            </>
        )
    }

    return (

        <div className=" bg-gradient-to-br from-black to-gray-700 sm:p-4 sm:m-20 rounded-xl w-1/4 text-white">
            <h1 className="text-center font-bold">{localGame.title}</h1>
            <img src={localGame.thumbnail} alt={localGame.title} />
            <h3 className='h-8 pt-2'>Platform: {localGame.platform}</h3> 
            <h3 className='h-8 pt-2'>Genre: {localGame.genre}</h3>
            {localGame.reviews.length !== 0 ? <button onClick={toggleReviews}>Show Reviews</button> : "There are no reviews for this game."}
            {showReviews ? reviewList : null}
            <br></br>
            <div className='text-center pt-6'>
                {currentUser ? showReviewForm() : null}
                {currentUser ? showAddReviewButton() : null}    
            </div>          
        </div>
    )
}

export default LocalGameCard