const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();
const authRoutes = require('./routes/authRoutes');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/auth', authRoutes);
app.use(express.static(path.join(__dirname, "../public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "index.html"));
});


const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
