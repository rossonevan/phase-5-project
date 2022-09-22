class UsersController < ApplicationController

    skip_before_action :authenticate_user, only: :create

    def index
        users = User.all
        render json: users, status: :ok
    end
    
    
    def show
        if current_user
            render json: current_user, status: :ok
        else
            render json: {error: "No current session stored"}, status: :unauthorized
        end
    end

    def create
        user = User.create!(user_params)
        session[:user_id] = user.id
        render json: user, status: :created
    end

    private

    def find_user
        User.find(params[:id])
    end

    def user_params
        params.permit(:username, :email, :password)
    end


end
