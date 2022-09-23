import {useEffect, useState} from 'react';



function LocalGameCard({ currentUser, handleReviews, localGame}) {

    const [showReviews, setShowReviews] = useState(false)

    const toggleReviews = () => {
        setShowReviews(showReviews => !showReviews)
    }
        
        // const filteredUndefined = reviews ? reviews.filter( function (review){
        //     return review !== undefined;
        // }) : null

        // const reviewList = filteredUndefined.map(review => {
        //     return <>
        //         <h1>{review.comment}</h1>
        //         <h1>{review.rating}</h1>
        //     </>
        // })


    return (

        <div className=" bg-gradient-to-br from-black to-gray-700 sm:p-4 sm:m-20 rounded-xl w-1/4 text-white">
            <h1 className="text-center font-bold">{localGame.title}</h1>
            <img src={localGame.thumbnail} alt={localGame.title} />
            <h3>Platform: {localGame.platform}</h3> 
            <h3>Genre: {localGame.genre}</h3>
            <button onClick={toggleReviews}>Show Reviews</button>                
        </div>
    )
}

export default LocalGameCard