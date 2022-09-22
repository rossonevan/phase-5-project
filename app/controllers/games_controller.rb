class GamesController < ApplicationController

    skip_before_action :authenticate_user

    def from_api 
        r = RestClient.get('https://www.freetogame.com/api/games')
        render json: r.body
    end

    def show
        game = find_game
        render json: game, status: :ok
    end

    private

    def find_game
        Game.find(params[:id])
    end

end
