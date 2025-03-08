const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require('./config/db')
const userRoutes = require('./routes/userRoute')

const app = express();
const port = process.env.PORT || 5000;

connectDB()   // connect to DB


app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use('/api/user', userRoutes)

// Start server
app.listen(port, () => {
  console.log(`🚀 Server started on port ${port}`);
});
