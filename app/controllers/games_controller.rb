class GamesController < ApplicationController

    skip_before_action :authenticate_user

    def api 
        r = RestClient.get('https://www.freetogame.com/api/games')
        render json: r.body
    end

    def show
        game = Game.find(params[:id])
        r = RestClient.get(`https://www.freetogame.com/api/game?id=#{game}`)
        render json: game
    end


end
