import { useEffect, useState } from "react"


function UserPage({updateUser, currentUser, reviews}) {

    const [loading, setLoading] = useState(true)
    const [errors, setErrors] = useState(false)

    const getReviews = () => {
        fetch(`/me`)
        .then(res => {
            if(res.ok){
                res.json().then(user => {
                    updateUser(user)
                    setLoading(false)
                })
            } else {
                res.json().then(data => setErrors(data.error))
            }
        })
    }

    console.log(reviews)
    
    useEffect(() => {
        getReviews()
    }, [])

    if(loading) return <h1>Loading...</h1>
    if(errors) return <h1>{errors}</h1>

    return (
        <div className="block p-4 rounded-lg shadow-sm shadow-indigo-100">
            <h1 className='text-center text-6xl text-white'>My Reviews</h1>
            <ul className=" flex-wrap p-6 bg-white sm:p-4 sm:m-10 rounded-xl w-3/12">
                {currentUser.reviews.map(review => {
                    return (
                        <div>
                            <img src={review.game.thumbnail} alt={review.game.title} />
                        </div>
                    )
                })}

            </ul>
        </div>
    )
}

export default UserPage