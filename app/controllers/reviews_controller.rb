class ReviewsController < ApplicationController

    skip_before_action :authenticate_user, only: :show


    # def index
    #     reviews = Review.all
    #     render json: reviews, status: :ok
    # end 

    # def show
    #     review = find_review
    #     render json: review, status: :ok
    # end

    def create
        user = current_user
        character = Character.find_or_create_by( character_params)
        
        review = Review.new(review_params)
        review.user_id = user.id
        review.character_id = character.id
        review.save
        render json: review, status: :created
    end

    # def update
    #     review = find_review
    #     review.update!(review_params)
    #     render json: review, status: :accepted
    # end

    # def destroy
    #     review = find_review
    #     review.destroy
    #     head :no_content
    # end

    private

    def find_review
        Review.find(params[:id])
    end

    def review_params
        params.permit(:comment, :rating, :user_id)
    end

    def game_params
        params.permit( :title, :short_desciption, :genre, :platform, :publisher, :developer, :release_date, :thumbnail )
    end

end
