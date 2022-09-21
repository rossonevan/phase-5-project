


function GameCard({game, selectGame}) {


    return (
        <div className=" flex-wrap p-6 bg-white sm:p-4 sm:m-10 rounded-xl w-3/12">
            <h1 className="text-center font-bold">{game.title}</h1>
            <img src={game.thumbnail} alt={game.title} onClick={() => selectGame(game)} />
            <p>Publisher: {game.publisher}</p>
            <p>Developer: {game.developer}</p>
            <h3>Platform: {game.platform}</h3> 
            <h3>Genre: {game.genre}</h3>
            <h4>Release Date: {game.release_date}</h4>
            
            <h4>Description: {game.short_description}</h4>

        </div>
    )
}

export default GameCard