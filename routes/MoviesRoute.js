const express = require("express");
const router = express.Router();
const { searchMovies } = require("../controllers/MoviesController");

// Search for movies
router.get("/search", searchMovies);

module.exports = router;
