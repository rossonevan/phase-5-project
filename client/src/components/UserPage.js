import { useEffect, useState } from "react"


function UserPage({updateUser, currentUser}) {

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
    console.log(currentUser)

    useEffect(() => {
        getReviews()
    }, [])

    if(loading) return <h1>Loading...</h1>
    if(errors) return <h1>{errors}</h1>

    return (
        <div>
            <h1>User Page</h1>
        </div>
    )
}

export default UserPage