import db from "./src/database/configdb.js";
import express from "express";
import userRoute from "./src/routes/user.route.js";
import rootRoute from "./src/routes/root.route.js";
import swaggerRoute from "./src/routes/swagger/swagger.route.js";
import cors from "cors"

const app = express();

const corsOpts = {
    origin: '*',
  
    methods: [
      'GET',
      'POST',
      'PUT',
      'DELETE'
    ],
  
    allowedHeaders: [
      'Content-Type',
    ],
};
  
app.use(cors(corsOpts));
app.use(express.json());
app.use("/user", userRoute);
app.use("/", rootRoute);
app.use("/docs", swaggerRoute);

db.connect();

const PORT = process.env.PORT;
app.listen(PORT, () => { });

