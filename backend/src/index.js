const express = require("express");
const cors = require("cors");
const db = require("./api/config/DatabaseConfig");
require("dotenv").config();

//Routes
const auth = require("./api/routes/api_auth");
const contact = require("./api/routes/api_contact");

const app = express();
db.connect();
app.use(express.json());
app.use(cors())

app.use('/api/auth',auth);
app.use('/api/contacts',contact);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Starting Node js on PORT ${port}...`);
});
