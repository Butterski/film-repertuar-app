const conn = require("../dbConnection");

module.exports = (req, res) => {
  conn.query(
    `SELECT showtimes.id, movies.title, movies.release_date, movies.genre, movies.runtime, 
    start_time AS start_date, TIME(start_time) AS start_time FROM movies 
    INNER JOIN showtimes ON movies.id = showtimes.movie_id ORDER BY start_time ASC;`,
    (err, result, fields) => {
      if (err) throw err;
      res.json(result);
    }
  );
};
