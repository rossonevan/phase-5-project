


function GameCard({game, selectGame}) {


    return (
        <div>
            <h1>{game.title}</h1>
            <p>Publisher: {game.publisher}</p>
            <p>Developer: {game.developer}</p>
            <img src={game.thumbnail} alt={game.title} onClick={() => selectGame(game)} />
            <h3>Platform: {game.platform}</h3> 
            <h3>Genre: {game.genre}</h3>
            <h4>Release Date: {game.release_date}</h4>
            
            <h4>Description: {game.description}</h4>

        </div>
    )
}

export default GameCard