import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./config/database.js";
import userRoute from "./routes/userRoute.js";
import subscriptionRoute from "./routes/subscriptionRoute.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use(userRoute);
app.use(subscriptionRoute);

try {
  db.authenticate();
  console.log("Database Connected");
} catch (err) {
  console.log(err.message);
}

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
