const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const errorHandler = require("./middleware/errorMiddleware");

const app = express();

const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes Middleware
app.use("/api/users", userRoutes);

// Routes
app.get("/", (req, res) => {
  res.send("Home Page");
});

// Error Middleware
app.use(errorHandler);

// Connect to DB and start server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server Running on port ${PORT}`);
      console.log(`http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.log(err));
