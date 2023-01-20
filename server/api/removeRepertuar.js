const conn = require("../dbConnection");

module.exports = (req, res) => {
  try {
    const showtime_id = req.body.showtime_id;
    if(showtime_id){
    const sql =
      "DELETE FROM `showtimes` WHERE `showtimes`.`id` = ?;";
    conn.query(sql, [showtime_id], (err, result) => {
      if (err) throw err;
      if (result.length === 0) {
        res.status(401).json({ error: "Something went wrong" });
      } else {
        res.json({response: "Removed schedule with id " + showtime_id});
      }
    });
  } else {
    res.status(401).json({ error: "Something went wrong" });
  }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
