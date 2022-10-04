class Game < ApplicationRecord
    has_many :reviews
    has_many :users, through: :reviews

    def number_of_reviews
        self.reviews.length
    end

end
