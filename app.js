const express = require("express");
const userRoute = require("./src/routes/user.route");
const rootRoute = require("./src/routes/root.route");
const db = require("./src/database/configdb.js");
const app = express();

app.use(express.json());
app.use("/user", userRoute);
app.use("/", rootRoute);

db.connect();

const PORT = process.env.PORT;
app.listen(PORT, () => { });

