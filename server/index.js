require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const conn = require("./dbConnection");
const jwt = require("jsonwebtoken");

const PORT = process.env.PORT || 3001;
const app = express();
app.use(bodyParser.json());

// since its just small project im not gonna do the whole autorisation 
// thing  but if you need it just decomment this part of code :)

// app.use((req, res, next) => {
//   try {
//     const token = req.headers.authorization.split(" ")[1];
//     if (!token) {
//         return next();
//     }
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.userData = decoded;
//     next();
//   } catch (error) {
//     return res.status(401).json({
//       message: 'Auth failed'
//     });
//   }
// });

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.post("/api/login", (req, res) => {
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
});

app.post("/api/add_repertuar", (req, res) => {
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
});

app.get("/api/get_repertuar", (req, res) => {
  conn.query(
    `SELECT movies.title, movies.release_date, movies.genre, movies.runtime, DATE(start_time) AS start_date, TIME(start_time) AS start_time FROM movies INNER JOIN showtimes ON movies.id = showtimes.movie_id ORDER BY start_time ASC;`,
    (err, result, fields) => {
      if (err) throw err;
      res.json(result);
    }
  );
});

app.get("/api/get_movies", (req, res) => {
  conn.query(`SELECT id, title FROM movies;`, (err, result, fields) => {
    if (err) throw err;
    res.json(result);
  });
});

app.get("/placeholder_img.png", (req, res) => {
  res.sendFile(__dirname + "/images/placeholder_img.png");
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
