const List = require("../models/MoviesListModel");

exports.createList = async (req, res) => {
  const { name, isPublic } = req.body;
  try {
    if (!req.user || !req.user.id) {
      return res.status(400).json({ message: "User information missing" });
    }
    const newList = new List({ user: req.user.id, name, isPublic });
    await newList.save();
    res.status(201).json({
      success: true,
      message: "List created successfully",
      newList,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getLists = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      console.log("User information missing", req.user); // Debugging line
      return res.status(400).json({ message: "User information missing" });
    }
    const lists = await List.find({ user: req.user.id });
    res.json(lists);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.addMovieToList = async (req, res) => {
  const { listId, movieId } = req.body;
  try {
    let list = await List.findById(listId);
    if (!list) return res.status(404).json({ message: "List not found" });

    if (list.user.toString() !== req.user._id)
      return res.status(401).json({ message: "User not authorized" });

    list.movies.push(movieId);
    await list.save();
    res.json(list);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getPublicList = async (req, res) => {
  try {
    const list = await List.findById(req.params.id);
    if (!list) return res.status(404).json({ message: "List not found" });

    if (!list.isPublic)
      return res.status(401).json({ message: "List is private" });

    res.json(list);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
