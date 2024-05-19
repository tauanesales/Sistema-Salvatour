import db from "./src/database/configdb.js";
import express from "express";
import userRoute from "./src/routes/user.route.js";
import rootRoute from "./src/routes/root.route.js";
import loginRoute from "./src/routes/auth.route.js";
import swaggerRoute from "./src/routes/swagger.route.js";
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());
app.use("/user", userRoute);
app.use("/auth", loginRoute);
app.use("/", rootRoute);
app.use("/doc", swaggerRoute);

db.connect();

const PORT = process.env.PORT;
app.listen(PORT, () => { });

