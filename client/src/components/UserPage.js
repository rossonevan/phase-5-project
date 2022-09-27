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
    
    useEffect(() => {
        getReviews()
    }, [])

    if(loading) return <h1 className='text-center text-lg text-white'>Loading...</h1>
    if(errors) return <h1>{errors}</h1>

    return (
        <article className="p-6 bg-white sm:p-4 sm:m-10 rounded-xl ring ring-blue-50">
            {currentUser.reviews.map(review => {
                return (
                    <div className="flex items-start">
                        <div class="sm:ml-8">                            
                            <h1 className="mt-4 text-lg text-grey-500 font-medium sm:text-xl">{review.game.title}</h1>
                            <h1 className="mt-1 text-sm text-grey-100">{review.comment}</h1>
                        </div>
                    </div>
                )
            })}         
        </article>
    )
}

export default UserPage