import {useState} from 'react';
import EditForm from './EditForm';



function LocalGameCard({ localGame, currentUser, handleReviews, handleDelete, handlePatch, change, setChange}) {

    const [showForm, setShowForm] = useState(false)
    const [form, setForm] = useState({})
    const [showReviews, setShowReviews] = useState(false)


    const handleRemove = (id) => {
        fetch(`/reviews/${id}`, {
            method: "DELETE",
        })
        .then(review => {
            handleDelete(review)
            setChange(!change)
        });
    }

    const toggleReviews = () => {
        setShowReviews(showReviews => !showReviews)
    }

    // List of Reviews
    const reviewList = localGame.reviews?.map( review => {
        return (
            <div className='border-2 border-red-600 rounded bg-white text-black text-center m-2'>
                <div className='flow-root m-2'>
                <h4 className='float-left'><strong>{review.user.username}</strong></h4>
                <p className='float-right'><strong>Rating:</strong> {review.rating}</p>
                </div>
                <p className='m-2 p-2 break-words'>{review.comment}</p>
                {currentUser.id === review.user.id ?
                (<div className='flow-root m-2'>
                    <EditForm handlePatch={handlePatch} review={review} change={change} setChange={setChange}/>
                    <button onClick={() => handleRemove(review.id)} className="bg-red-500 hover:bg-red-700 text-white font-normal text-sm py-1 px-2 rounded-full float-right">X</button>
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
        .then(reviews => {
            handleReviews(reviews)
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
                <textarea className='
                    form-control
                    block
                    w-full
                    px-3
                    py-1.5
                    text-base
                    font-normal
                    text-gray-700
                    bg-white bg-clip-padding
                    border border-solid border-gray-300
                    rounded
                    transition
                    ease-in-out
                    m-0
                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none' type='text' onChange={userInput} name='comment' placeholder='Write your review...' required />
                <input className='rounded pl-1 m-2 w-20' type='number' min='0' max='5' onChange={userInput} name='rating' placeholder='Rating' required/>
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
            <div className='pt-6'>
                <div className='text-center'>
                    {currentUser ? showReviewForm() : null}
                </div>
                {currentUser ? showAddReviewButton() : null}    
            </div>          
        </div>
    )
}

export default LocalGameCard