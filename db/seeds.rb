# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

puts "Seeding...."

User.destroy_all
# Review.destroy_all

User.reset_pk_sequence
# Review.reset_pk_sequence

u1 = User.create!(username: "rossonevan", email: "rossonevan@gmail.com", password: "123")
u2 = User.create!(username: "jsonmaker", email: "json@gmail.com", password: "1234")
u3 = User.create!(username: "bob123", email: "bobby44@gmail.com", password: "abc")


# r1 = Review.create!(comment: "Very good.", rating: 4, user_id: rand(1..3), game_id: 517)
# r2 = Review.create!(comment: "Didn't like, pay to win.", rating: 1, user_id: rand(1..3), game_id: 521)
# r3 = Review.create!(comment: "I always have a good time.", rating: 4, user_id: rand(1..3), game_id: 508)
# r4 = Review.create!(comment: "Was really fun years ago, but now is a mess.", rating: 2, user_id: rand(1..3), game_id: 516)
# r5 = Review.create!(comment: "Not bad, not good.", rating: 3, user_id: rand(1..3), game_id: 345)
# r6 = Review.create!(comment: "Not good, don't recommend.", rating: 1, user_id: rand(1..3), game_id: 427)
# r7 = Review.create!(comment: "A better smash brothers cause it has Shaggy.", rating: 5, user_id: rand(1..3), game_id: 525)
# r8 = Review.create!(comment: "Remind me of Breathe of the Wild, which is a win.", rating: 4, user_id: rand(1..3), game_id: 475)
# r9 = Review.create!(comment: "We're weird beans fighting for a crown. That's all.", rating: 5, user_id: rand(1..3), game_id: 523)
# r10 = Review.create!(comment: "Can we get a good Game of Thrones game?", rating: 2, user_id: rand(1..3), game_id: 340)

puts "Done seeding!"