const conn = require("../dbConnection");
const jwt = require("jsonwebtoken");

module.exports = (req, res) => {
  try {
    const { login, password } = req.body;
    if (!login || !password) {
      return res.status(400).json({ error: "Login and password are required" });
    }
    const sql =
      "SELECT username, isAdmin FROM users WHERE username = ? and password = ?";
    conn.query(sql, [login, password], (err, result) => {
      if (err) throw err;
      if (result.length === 0) {
        res.status(401).json({ error: "Bad login or password" });
      } else {
        const token = jwt.sign(
          {
            username: result[0].username,
            isAdmin: result[0].isAdmin,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "1h",
          }
        );
        res.json({ token });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
