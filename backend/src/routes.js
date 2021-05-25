import express, { request, response } from "express";
import dotenv from "dotenv";
import db from "./db";

dotenv.config();
const router = express.Router();

router.get("/", async (request, response) => {
  let data = await db.getHomeData();
  response.status(200).send(data);
});

export default router;
