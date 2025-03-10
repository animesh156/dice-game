const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require('./config/db')
const userRoutes = require('./routes/userRoute')
const gameRoutes = require('./routes/gameRoutes')

const app = express();
const port = process.env.PORT;

connectDB()   // connect to DB


app.use(
  cors({
    origin: ["http://localhost:5173", "https://dice-game-gold-tau.vercel.app"],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use('/api/user', userRoutes)
app.use('/api', gameRoutes)

// Start server
app.listen(port, () => {
  console.log(`🚀 Server started on port ${port}`);
});
