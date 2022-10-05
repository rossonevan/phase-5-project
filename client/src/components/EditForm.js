import {useState} from 'react';

function EditForm ({ handlePatch, review}) {

    const [comment, setComment] = useState('')
    const [rating, setRating] = useState(0)
    const [editForm, setEditForm] = useState(false)

    const toggleEditForm = () => {
        setEditForm(editForm => !editForm)
    }

    const handleEditForm = (e) => {
        e.preventDefault()
        fetch(`/reviews/${review.id}`,
        {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                comment: comment,
                rating: rating
            })
        })
        .then((resp) => resp.json())
        .then(review => {
            handlePatch(review, review.game.id)
        })
        e.target.reset()
    }

    const editFormInputs = 
        <form className='text-black' onSubmit={handleEditForm}>
            <textarea className='
                    form-control
                    block
                    w-full
                    px-3
                    py-1.5
                    text-base
                    font-normal
                    text-gray-700
                    bg-gray-300 bg-clip-padding
                    border border-solid border-gray-300
                    rounded
                    transition
                    ease-in-out
                    m-0
                    focus:text-gray-700 focus:bg-gray-200 focus:border-red-600 focus:outline-none' onChange={(e) => setComment(e.target.value)} name="comment" type='text' placeholder="Write your review..." maxLength='500' required />
            <input className='rounded pl-1 m-2 w-20 bg-gray-300 border transition ease-in-out focus:bg-gray-200 focus:border-red-600 focus:outline-none' onChange={(e) => setRating(e.target.value)} name="rating" type="number" min="0" max="5" step="1" placeholder="Rating" required />
            <button type="submit" className="bg-red-500 hover:bg-red-700 text-white font-normal text-sm py-1 px-2 rounded-full">Edit</button>
        </form>

    return (
        <div>
            {editForm ? editFormInputs: null}
            {editForm ? <button onClick={toggleEditForm} className="bg-red-500 hover:bg-red-700 text-white font-normal text-sm py-1 px-2 rounded-full float-left">Cancel Editing Review</button> : <button onClick={toggleEditForm} className="bg-red-500 hover:bg-red-700 text-white font-normal text-sm py-1 px-2 rounded-full float-left">Edit Review</button>}
        </div>
    )
}

export default EditForm