# Worth-the-play?
A web application that allows a user to write reviews for different free-to-play games through a React frontend that interacts with a Rails backend using an external API. If the user is not signed in, they can only see the 'Home' page, 'Reviewed Games' page, 'SignUp' page, and 'Login' page. If the user is signed in, they can write reviews for each game, delete and edit their reviews on the 'Reviewed Games' page, and view their reviews in their 'My Reviews' page.

On the Home Page if the User is not logged in
  * They will see Routes: Home, SignUp, Login, Reviewed Games
  * Every Game from the external API and their information
    * If the user clicks on the game image, it shows a short description for that game.

On the Home Page if the User is logged in
  * They will see Routes: Home, Reviewed Games, My Reviews
  * Every game and their information
    * If the user clicks on the game image, it shows a short description for that game.

On the Reviewed Games Page if the User is not logged in
  * They will see Routes: Home, SignUp, Login, Reviewed Games
  * Every reviewed game and their information with all their reviews

On the Reviewed Games Page if the User is logged in
  * They will see Routes: Home, Reviewed Games, My Reviews
  * Every reviewed game and their information with all their reviews
    * Can create a review for each game
    * Can only edit and delete their own created reviews

SignUp
  * Can create a User with a unique username, email, and password
  * Has to enter the same password twice
  * Will automatically be logged in if have successfully created a user

Login
  * Must enter the username and password that is in the database

My Reviews
  * Can see all the reviews they have created.
