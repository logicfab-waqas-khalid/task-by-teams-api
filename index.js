const express = require("express");
//const axios = require("axios");
const config = require("../task-by-teams-api/config/default.json");
const cors = require("cors");
const app = express();

app.use(cors());
require("./startup/routes")(app);
require("./startup/db")();


const port = process.env.PORT || 3002;

app.listen(port, () => console.log(`App listening on port ${port}`));