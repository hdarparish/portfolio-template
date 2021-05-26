import express, { request, response } from "express";
import dotenv from "dotenv";
import db from "./db";

dotenv.config();
const router = express.Router();

router.get("/", async (request, response) => {
  let data = await db.getHomeData();
  response.status(200).send(data);
});
router.get("/projects", async (request, response) => {
  let data = await db.getProjectsData();
  response.status(200).send(data);
});

router.post("/contact", async (request, response) => {
  let result = await db.addContactInfo(request.body.contactInfo);
  response.status(200).send(result);
});

export default router;
