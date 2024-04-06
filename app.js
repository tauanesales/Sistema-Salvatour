const express = require("express");
const userRoute = require("./src/routes/user.route");
const db = require("./src/database/configdb.js");
const app = express();

app.use(express.json());
app.use("/user", userRoute);
db.connect();

const PORT = process.env.PORT;
app.listen(PORT, () => { });

