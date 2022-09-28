import {useEffect, useState} from 'react';
import EditForm from './EditForm';



function LocalGameCard({ localGame, currentUser, handleReviews, handleDelete, handlePatch, setChange, change}) {

    const [showForm, setShowForm] = useState(false)
    const [form, setForm] = useState({})
    const [showReviews, setShowReviews] = useState(false)


    const handleRemove = (id) => {
        fetch(`/reviews/${id}`, {
            method: "DELETE",
        })
        .then((review) => {
        handleDelete(review)
        setChange(!change)
        });
    }

    const toggleReviews = () => {
        setShowReviews(showReviews => !showReviews)
    }

    // List of Reviews
    const reviewList = localGame.reviews.map( review => {
        return (
            <div className='border-2 border-red-600 rounded bg-white text-black text-center m-4'>
                <p>{review.comment}</p>
                <p><strong>Rating:</strong> {review.rating}</p>
                <h4><strong>User:</strong> {review.user.username}</h4>
                {currentUser.id === review.user.id ?
                (<div className='flow-root'>
                    <EditForm handlePatch={handlePatch} review={review} setChange={setChange} change={change}/>
                    <button onClick={() => handleRemove(review.id)} className="bg-red-500 hover:bg-red-700 text-white font-normal text-sm py-1 px-2 rounded-full float-right">Remove Review</button>
                </div>) 
                    : null}
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
        .then(data => {
            handleReviews(data)
            setChange(!change)
        })
        e.target.reset()
    }

        // Toggle Add Review Form
    const showReviewForm = () => {
        return (
        <div>
        {showForm ? 
            <form className='text-black' onSubmit={addReview}>
                <input className='rounded pl-1 m-2' type='text' onChange={userInput} name='comment' placeholder='Comment' required/>
                <input className='rounded pl-1 m-2' type='number' min='0' max='5' onChange={userInput} name='rating' placeholder='Rating' required/>
                <button  type='submit' className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full m-2"> Submit</button>
            </form>
        :
        null}
        </div>
    )}

    // Add Review Button
    const showAddReviewButton = () => {
        return (
            <>
            {showForm ? (<button onClick={() => setShowForm(!showForm)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full m-4">Cancel</button>) : (<button onClick={() => setShowForm(!showForm)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full m-4">Add A Review</button>)}
            </>
        )
    }

    return (

        <div className=" bg-gradient-to-br from-black to-gray-700 sm:p-4 sm:m-20 rounded-xl w-1/4 text-white">
            <h1 className="text-center text-normal font-bold h-8">{localGame.title}</h1>
            <img src={localGame.thumbnail} alt={localGame.title} className='w-full' />
            <div className='flow-root'>
                <h3 className='h-8 pt-2 float-left'><strong>Platform:</strong> {localGame.platform}</h3> 
                <h3 className='h-10 pt-2 float-right'><strong>Genre:</strong> {localGame.genre}</h3>
            </div>
            {localGame.reviews.length !== 0 ? <button onClick={toggleReviews} className= 'hover:text-red-500 text-white font-bold'>Reviews</button> : "There are no reviews for this game."}
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