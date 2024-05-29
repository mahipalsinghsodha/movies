const axios = require("axios");
exports.searchMovies = async (req, res) => {
  const { s } = req.query; // Correctly extract the search query
  try {
    const response = await axios.get(
      `http://www.omdbapi.com/?s=${s}&apikey=${process.env.OMDB_API_KEY}`
    );
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
