const mongoose = require("mongoose");

function connect() {
  mongoose
    .connect(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_API}/${process.env.DB_NAME}?retryWrites=true&w=majority`
    )
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log("Could not connect to MongoDB"));
}

module.exports.connect = connect;
