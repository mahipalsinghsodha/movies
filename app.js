const express = require("express");
const cors = require("cors");
const connectionDB = require("./config/db");
require("dotenv").config();
const app = express();

app.use(cors());
app.use(express.json());

connectionDB();

// Routes
app.use("/api/users", require("./routes/AuthRoute"));
app.use("/api/movies", require("./routes/MoviesRoute"));
app.use("/api/lists", require("./routes/MoviesListRoute"));

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
