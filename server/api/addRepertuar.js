const conn = require("../dbConnection");

module.exports = (req, res) => {
  try {
    const { movie_id, start_date } = req.body;
    const sql =
      "INSERT INTO `showtimes` (`id`, `movie_id`, `start_time`) VALUES (NULL, ?, ?)";
    conn.query(sql, [movie_id, start_date], (err, result) => {
      if (err) throw err;
      if (result.length === 0) {
        res.status(401).json({ error: "Something went wrong" });
      } else {
        res.json(result);
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
