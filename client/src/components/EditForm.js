import {useState} from 'react';

function EditForm ({ handlePatch, review, change, setChange}) {

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
            handlePatch(review)
            setChange(!change)
        })
        e.target.reset()
    }

    const editFormInputs = 
        <form className='text-black' onSubmit={handleEditForm}>
            <input className='bg-gray-300 rounded pl-2' onChange={(e) => setComment(e.target.value)} name="comment" type='text' placeholder="Write Your Review Here" maxLength='500' required />
            <input className='bg-gray-300 rounded pl-2 m-2' onChange={(e) => setRating(e.target.value)} name="rating" type="number" min="0" max="5" step="1" placeholder="Rating" required />
            <button type="submit" className="bg-red-500 hover:bg-red-700 text-white font-normal text-sm py-1 px-2 rounded-full">Edit</button>
        </form>


    return (
        <div>
            {editForm ? <button onClick={toggleEditForm} className="bg-red-500 hover:bg-red-700 text-white font-normal text-sm py-1 px-2 rounded-full float-left">Cancel Editing Review</button> : <button onClick={toggleEditForm} className="bg-red-500 hover:bg-red-700 text-white font-normal text-sm py-1 px-2 rounded-full float-left">Edit Review</button> }
            {editForm ? editFormInputs: null}
        </div>
    )
}

export default EditForm