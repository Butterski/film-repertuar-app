const conn = require("../dbConnection");

module.exports = (req, res) => {
  conn.query(`SELECT id, title FROM movies;`, (err, result, fields) => {
    if (err) throw err;
    res.json(result);
  });
};
