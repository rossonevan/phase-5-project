import {useState} from 'react';
import EditForm from './EditForm';



function LocalGameCard({ localGame, currentUser, handleReviews, handleDelete, handlePatch}) {

    const [showForm, setShowForm] = useState(false)
    const [form, setForm] = useState({})
    const [showReviews, setShowReviews] = useState(false)


    const handleRemove = (id) => {
        fetch(`/reviews/${id}`, {
            method: "DELETE",
        })
        .then(res => res.json())
        .then(review => {
            handleDelete(review, review.game.id)
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
                    <EditForm handlePatch={handlePatch} review={review} />
                    <button onClick={() => handleRemove(review.id)} className="bg-red-500 hover:bg-red-700 text-white font-normal text-sm py-1 px-2 rounded-full float-right"><strong>X</strong></button>
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
        .then(review => {
            handleReviews(review, review.game.id)
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

    // Calculating Rating Sum
    let ratingSum  = 0
    let i = 1
    const calculateRating = (localGame) => {
        localGame.reviews.map( review => {
            ratingSum = review.rating + ratingSum
            i = i + 1
        })
        return (ratingSum/(i - 1)).toFixed(2)
    }

    const numberOfReviews = (localGame) => {
        localGame.reviews.map( review => {
            let i = 0
            i = i + 1
        })
        return (i - 1)
    }



    return (

        <div className=" bg-gradient-to-br from-black to-gray-700 sm:p-4 sm:m-20 rounded-xl w-1/4 text-white">
            <h1 className="text-center text-normal font-bold h-8">{localGame.title}</h1>
            <img src={localGame.thumbnail} alt={localGame.title} className='w-full' />
            <div className='flow-root'>
                <h3 className='h-8 pt-2 float-left'><strong>Platform:</strong> {localGame.platform}</h3> 
                <h3 className='h-10 pt-2 float-right'><strong>Genre:</strong> {localGame.genre}</h3>
            </div>
            <div className="flex items-center">
                <svg aria-hidden="true" className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                <svg aria-hidden="true" className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                <svg aria-hidden="true" className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                <svg aria-hidden="true" className="w-5 h-5 text-gray-300 dark:text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                <svg aria-hidden="true" className="w-5 h-5 text-gray-300 dark:text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                <p className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">{calculateRating(localGame)} out of 5</p>
            </div>



            {localGame.reviews.length !== 0 ? <button onClick={toggleReviews} className= 'hover:text-red-500 text-white font-bold'>Reviews ({numberOfReviews(localGame)})</button> : "All the reviews for this game have been removed."}
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