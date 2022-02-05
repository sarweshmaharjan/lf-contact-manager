const express = require("express");
const db = require("./api/config/DatabaseConfig");
require("dotenv").config();

const app = express();
db.connect();

app.get("/", function (req, res) {
  res.send("Hello World");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Starting Node js on PORT ${port}...`);
});
