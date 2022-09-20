class ApplicationController < ActionController::API
  include ActionController::Cookies

  before_action :authenticate_user

  rescue_from ActiveRecord::RecordNotFound, with: :record_not_found
  rescue_from ActiveRecord::RecordInvalid, with: :record_invalid

  def current_user
    User.find_by(id: session[:user_id])
  end

  private

  def record_not_found(not_found)
    render json: {error: "#{not_found.model} not found"}, status: :not_found
  end

  def record_invalid(invalid)
    render json: {errors: invalid.record.errors.full_messages}, status: :unprocessable_entity
  end

  def authenticate_user
    render json: {errors: {User: 'Not Authorized'} }, status: :unauthorized unless current_user
  end

end
