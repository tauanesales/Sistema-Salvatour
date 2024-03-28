const express = require("express");
const db = require("./database/configdb.js");
const app = express();

// Open Route
app.get("/", (req, res) => {
    res.status(200).json({ msg: "API incializada" });
});

db.connect();

const PORT = process.env.PORT;
app.listen(PORT, () => {});

