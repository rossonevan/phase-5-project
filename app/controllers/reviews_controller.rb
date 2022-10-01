class ReviewsController < ApplicationController

    skip_before_action :authenticate_user, only: [:show, :index]


    def index
        reviews = Review.all
        render json: reviews, status: :ok
    end 

    def show
        review = find_review
        render json: review, status: :ok
    end

    def create
        user = current_user
        game = Game.find_or_create_by(game_params)
        
        review = Review.new(review_params)
        review.user_id = user.id
        review.game_id = game.id
        review.save
        render json: review, status: :created
    end

    def update
        review = find_review
        review.update!(review_params)
        render json: review, status: :accepted
    end

    def destroy
        review = find_review
        copy = find_review
        review.destroy
        render json: copy, status: :ok
    end

    # Must respond to game
    def first_review
        user = current_user
        game = Game.find_or_create_by(game_params)
        
        review = Review.new(review_params)
        review.user_id = user.id
        review.game_id = game.id
        review.save
        render json: game, status: :created, include: ['reviews', 'reviews.user']
    end

    private

    def find_review
        Review.find(params[:id])
    end

    def review_params
        params.permit(:comment, :rating, :user_id)
    end

    def game_params
        params.permit(:title, :short_description, :genre, :platform, :publisher, :developer, :release_date, :thumbnail)
    end

end
