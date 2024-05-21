import db from "./src/database/configdb.js";
import express from "express";
import userRoute from "./src/routes/user.route.js";
import rootRoute from "./src/routes/root.route.js";
import authRoute from "./src/routes/auth.route.js";
import cors from 'cors';
import swaggerRoute from "./src/routes/swagger/swagger.route.js"
const app = express();

const corsOpts = {
    origin: '*',
  
    methods: [
      'GET',
      'POST',
      'PATCH',
      'DELETE'
    ],
  
    allowedHeaders: [
      'Content-Type',
      'Authorization'
    ],
};

app.use(cors(corsOpts));
app.use(express.json());
app.use("/user", userRoute);
app.use("/auth", authRoute);
app.use("/", rootRoute);
app.use("/docs", swaggerRoute);

db.connect();

const PORT = process.env.PORT;
app.listen(PORT, () => { });

