class GamesController < ApplicationController

    def api 
        r = RestClient.get('https://www.freetogame.com/api/games')
        render plain: r.body
    end


end
