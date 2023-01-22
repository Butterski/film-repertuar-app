require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const login = require("./api/login");
const addRepertuar = require("./api/addRepertuar");
const getRepertuar = require("./api/getRepertuar");
const getMovies = require("./api/getMovies");
const removeRepertuar = require("./api/removeRepertuar")
const editRepertuar = require('./api/editRepertuar')

const PORT = process.env.PORT || 3001;
const app = express();
app.use(bodyParser.json());

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.post("/api/login", login);
app.post("/api/add_repertuar", addRepertuar);
app.post("/api/edit_repertuar", editRepertuar);
app.post("/api/remove_repertuar", removeRepertuar)
app.get("/api/get_repertuar", getRepertuar);
app.get("/api/get_movies", getMovies);
app.get("/placeholder_img.png", (req, res) => {
  res.sendFile(__dirname + "/images/placeholder_img.png");
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});


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

