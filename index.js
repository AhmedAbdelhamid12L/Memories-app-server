import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import dbConnection from "./configration/config";
import postRoutes from "./apps/posts/routes/postsRoutes";

const app = express();

app.use(express.json());

app.use(cors());

dbConnection();
const port = process.env.PORT || 5000;

app.get("/", (req, res) => res.send("Hello To Memorise API!"));
app.use("/posts", postRoutes);

app.listen(port, () => {
  console.log(`App listening in port ${port}!`);
});
