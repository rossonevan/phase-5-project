class GameSerializer < ActiveModel::Serializer
  attributes :id, :title, :short_description, :genre, :platform, :publisher, :developer, :release_date, :thumbnail, :reviews, :number_of_reviews
  has_many :reviews
  has_many :users
end
