class GamesController < ApplicationController

    skip_before_action :authenticate_user

    def from_api 
        r = RestClient.get('https://www.freetogame.com/api/games')
        render json: r.body
    end

    

end
