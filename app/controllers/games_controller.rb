class GamesController < ApplicationController

    skip_before_action :authenticate_user

    def from_api 
        r = RestClient.get('https://www.freetogame.com/api/games')
        # JSON.parse(r.body) This is how we get into the data (changes to an array)
        # JSON.parse(r.body).map { |game| game['title']} Grabs all titles 
        render json: r.body
    end

    def index
        games = Game.all
        render json: games, status: :ok, include: ['reviews', 'reviews.user', 'reviews.game']
    end

    def show
        game = find_game
        render json: game, status: :ok, include: ['reviews', 'reviews.user', 'reviews.game']
    end

    private

    def find_game
        Game.find(params[:id])
    end

end
