const express = require("express");
const router = express.Router();
const auth = require("../middlewares/AuthMiddle");
const {
  createList,
  getLists,
  addMovieToList,
  getPublicList,
} = require("../controllers/MoviesListController");

// Create a list
router.post("/", auth, createList);

// Get user's lists
router.get("/", auth, getLists);

// Add a movie to a list
router.post("/add", auth, addMovieToList);

// Get a public list
router.get("/:id", getPublicList);

module.exports = router;
