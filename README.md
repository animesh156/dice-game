
# Provably Fair Dice Game
A simple provably fair dice game built with React (Vite) for the frontend and Node.js (Express) with MongoDB for the backend.


## 🚀 Features

- 🎨 Modern Dark-Themed UI

- 🎲 Rolling Dice Animation

- 💰 Balance Management (Stored in Database)

- 🔐 User Authentication (JWT)

- 🔍 Provably Fair System (SHA-256 for Verifiable Rolls)

- ⚡ Responsive & Fast Gameplay


## Tech Stack

**Frontend:** React (Vite), TailwindCSS, React Toastify (Notifications)

**Backend:** Node, Express, JSON Web Token (JWT), SHA-256 (Crypto)

**Database:** MongoDB




## Installation & Setup

### 🔹 Prerequisites
- Node.js (v18+)
- MongoDB Atlas or a local MongoDB instance


### 🔹 Clone the Repository

```bash
  git clone  https://github.com/animesh156/dice-game.git
  cd dice-game
```
### 🔹 Backend Setup

```bash
   cd server
  npm install
  ```
#### 🔹 Environment Variables (.env)
Create a .env file in the backend directory:

```bash
PORT=your_choice
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

```

#### 🔹 Start the Backend Server
```bash
 node index.js
 ```

### 🔹 Frontend Setup
```bash
 cd client
 npm install
 ```

#### 🔹 Start the Frontend Server
```bash
npm start
```










## API Reference

####  Roll Dice

```http
  POST /api/roll-dice
```
#### Request Body:
```
{
  "bet": 100
}
```

#### Response:
```
{
   "roll": 5,
  "newBalance": 1200
}
```

#### Register

```http
  POST /api/register
```

✅ Register the new user



#### Login

```http
  POST /api/login
```

✅ Login the existing user
