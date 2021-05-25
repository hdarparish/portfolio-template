import express from "express";
import dotenv from "dotenv";
import routes from "./src/routes";
import cors from "cors";

dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use(routes);

export default app.listen(port, () =>
  console.log(`API server ready on http://localhost:${port}`)
);
