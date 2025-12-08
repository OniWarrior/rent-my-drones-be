# Rent My Drones — Backend API

Backend API for a simulated drone rental platform that manages users, drones, and rental operations.  
The API supports two user roles — **Renter** and **Owner** — and handles authentication, drone availability, rentals, and returns, with all data stored in a PostgreSQL database.

Deployed backend (Docker container on Heroku):  
https://rent-my-drones-be-ffc04f1c4ced.herokuapp.com

---

## 🧩 Overview

The backend provides RESTful endpoints for:

- User registration and login  
- Renter workflows (view available drones, rent drones, return drones, view rented drones)  
- Owner workflows (view owned drones, view rented-out drones, view all owned drones, add new drones)  
- Recording rental and return events using dedicated tables

It is consumed by the React frontend for the **Rent My Drones** full-stack application.

---

## 🛠️ Tech Stack

- **Runtime:** Node.js  
- **Framework:** Express.js  
- **Database:** PostgreSQL  
- **ORM / Query Builder:** Knex.js  
- **Auth:** JSON Web Tokens (JWT), bcrypt (password hashing)  
- **Other:** CORS, dotenv  
- **Deployment:** Dockerized backend deployed to Heroku

---

## 🔐 Authentication & User Roles

The API uses:

- **JWT** for stateless authentication  
- **bcrypt** to hash user passwords  
- Middleware-protected routes for renter/owner operations

There are two user types:

- **Renter** — can browse available drones, rent drones, view their rented drones, and return drones.  
- **Owner** — can view drones they own, see which are rented vs available, and add new drones to the platform.

---

## 🗄️ Database Schema

### `User`
Stores login and identity information.

<br>
user_id       PK <br>
email   <br>
password      (hashed with bcrypt) <br>
first_name <br>
last_name  <br>

### `Renter`
Links a user account to a renter profile. <br>
renter_id     PK <br>
user_id       FK → users.user_id <br>

### `Owner`
Links a user account to an owner profile. <br>

owner_id      PK  <br>
user_id       FK → users.user_id  <br>

### `Drone`
Represents drones that can be rented that belong to owners <br>

drone_id        PK <br>
drone_name   <br>
drone_description <br>
drone_cost     <br>
drone_image      (URL string, not a stored image)  <br>
owner_id         FK → owners.owner_id            <br>
drone_is_rented  (boolean flag)          <br>
renter_id        FK → renters.renter_id (nullable) <br>

### `Return`
Records when a drone is returned <br>

return_id     PK <br>
renter_id     FK → renters.renter_id  <br>
owner_id      FK → owners.owner_id   <br>
drone_id      FK → drones.drone_id   <br>
return_date   (date the drone was returned) <br>

### `Order`
Records when a drone is rented. <br>

order_id      PK <br>
renter_id     FK → renters.renter_id  <br>
owner_id      FK → owners.owner_id    <br>
drone_id      FK → drones.drone_id    <br>
order_date    (date the drone was rented) <br>

---

## 📡 API Endpoints

Note: All endpoints that operate on renter/owner resources are protected and require a valid JWT token in the Authorization header (Bearer <token>).

### 🔐 **Auth Routes**
| Method | Endpoint          | Description                |
|--------|-------------------|----------------------------|
| POST   | `/api/auth/signup`   | Register new user         |
| POST   | `/api/auth/login`    | Login & receive JWT token |

###🧍 **Renter Routes**

These endpoints are used when a user is acting as a Renter.

### **User: Renter Routes**
| Method | Endpoint                 | Description                      |
|--------|---------------------------|----------------------------------|
| GET    | `/api/users/available`                 | Retrieves all drones currently available for rent                    |
| GET    | `/api/users/renter-total-rented`       | Retrieves portfolio                                                  |
| GET    | `/api/users/rented`                    | Retrieves all drones currently rented by the authenticated renter    |
| POST   | `/api/users/available/:drone_id`       | Rents a drone for the authenticated renter using the drone ID        |
| POST   | `/api/users/rented/:drone_id`          | Returns a rented drone for the authenticated renter                  |



###🧑‍💼 **Owner Routes**

These endpoints are used when a user is acting as an Owner.

| Method |	Endpoint |	Description                                    |
|--------|-----------|--------------------------------------------------|
| GET    |	`/api/users/available-drones`  	| Retrieves owner’s drones that are currently available to be rented out|
| GET    |	`/api/users/rented-drones`	    | Retrieves owner’s drones that are currently rented out                |
| GET    |	`/api/users/all-drones`	        | Retrieves all drones owned by the owner (both rented and available)   |
| POST	 |  `/api/users/add-drone`	        | Adds a new drone so it can be rented out                              |


## 📂 Project Structure (High Level)
```
rent-my-drones-be/
├── api/
│   ├── auth/          # auth routes / controllers
│   ├── data/          # database connection / migrations and seeds
│   ├── drones/        # drone queries
│   ├── secrets/       # JWT secret config / helpers
│   ├── users/         # renter and owner routes       
│   └── server.js
├── docker-compose.prod.yml  # compose file to build production local container for testing before deployment to Heroku
├── docker-compose.yml       # compose file to build local dev container that supports hot reloads.
├── Dockerfile               # Docker file for the local production local container
├── Dockerfile.dev           # Docker file for the dev local container  
├── knexfile.js
├── index.js
└── package.json
```
---

## 🚀 Running the Backend Locally
### 1️⃣ Install Dependencies

npm install

### 2️⃣ Environment Variables

Create a .env file in the backend root:

PORT=5000
DATABASE_URL=your-postgres-connection-string
JWT_SECRET=your-jwt-secret
NODE_ENV=development

### 3️⃣ Database Migrations & Seeds (if configured)
npx knex migrate:latest
npx knex seed:run

### 4️⃣ Start the Server

Development mode with hot reload (if configured):

npm run server


Or standard start:

npm run start


The API will run on:

http://localhost:<PORT>

## 🌐 Deployed Backend

The backend is deployed as a Dockerized container on Heroku:

https://rent-my-drones-be-ffc04f1c4ced.herokuapp.com


The frontend application communicates with this URL for all API operations.

## 🤝 Notes for Recruiters

### This backend demonstrates:

- Role-based logic for two distinct user types (Renter and Owner)

- JWT-based authentication and secure password storage with bcrypt

- RESTful API design and clear endpoint separation

- Data modeling for rental, return, and ownership records

- Use of PostgreSQL and Knex for relational data handling

- Containerized deployment (Docker) to a production environment (Heroku)

### It reflects how I approach backend architecture, stateful workflows, and integration with a React frontend in a full-stack project.

## 📬 Contact

Stephen Aranda
**Email:** aranda.stephen88@gmail.com
**LinkedIn:** https://www.linkedin.com/in/stephen-aranda-9b9974205

**GitHub:** https://github.com/OniWarrior
