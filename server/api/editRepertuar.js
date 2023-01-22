const conn = require("../dbConnection");

module.exports = (req, res) => {
  try {
    const { start_date, showtime_id } = req.body;
    if(showtime_id && start_date){
    const sql =
      "UPDATE `showtimes` SET `start_time` = ? WHERE `showtimes`.`id` = ?";
    conn.query(sql, [start_date, showtime_id], (err, result) => {
      if (err) throw err;
      if (result.length === 0) {
        res.status(401).json({ error: "Something went wrong" });
      } else {
        res.json(result);
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
