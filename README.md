# Periodic Tables Restaurant Reservation Application

This application was made with React.js / Express.js / Knex.js / Node.js / PostgreSql / Bootstrap

The application is a simple reservation managment system for restaurants to use on a day to day basis while keeping track of past and future reservations.

The user can :

-  Create / Update / Delete reservations
-  Assign those reservations to specific tables
-  Create Tables themselves
-  Search for reservations by phone number
-  Seat reservation when the customer arrives

The front-end portion of the application was made with React.js and CSS/Bootstrap.
The database was made using Express.js with migrations done using Knex.js. Which was designed using RESTful API principles and Elephant PostgreSQL.

All of which were deployed using Heroku.

## Installation Instructions

-  Fork and clone this repository.
-  Run cp ./back-end/.env.sample ./back-end/.env.
-  Update the ./back-end/.env file with the connection URL's to your ElephantSQL database instance.
-  Run cp ./front-end/.env.sample ./front-end/.env.
-  You should not need to make changes to the ./front-end/.env file unless you want to connect to a backend at a location other than http://localhost:5000.
-  Run npm install to install project dependencies.
-  Run npm run start:dev to start your server in development mode.

[Periodic Tables Link](https://restaurantres-client.herokuapp.com/)

### Some images of the application(dashboard, search, reservation, new table)

![Dashboard](./front-end/ScreenShots/dashboard.png)

![Search](./front-end/ScreenShots/search.png)

![Create Reservation](./front-end/ScreenShots/createReservation.png)

![Create Table](./front-end/ScreenShots/createTable.png)
