import express, { request, response } from "express";
import dotenv from "dotenv";
import db from "./db";
import bcrypt from "bcrypt";
import * as jwtoken from "jsonwebtoken";

dotenv.config();
const router = express.Router();

router.get("/", async (request, response) => {
  try {
    let data = await db.getHomeData();
    response.status(200).send(data);
  } catch (err) {
    response.status(404).send(err);
  }
});
router.get("/projects", async (request, response) => {
  try {
    let data = await db.getProjectsData();
    response.status(200).send(data);
  } catch (err) {
    response.status(404).send(err);
  }
});

router.post("/contact", async (request, response) => {
  try {
    let result = await db.addContactInfo(request.body.contactInfo);
    if (result.insertedCount) {
      response.status(200).send({ message: "message sent" });
    }
    response.status(400).send({ error: "could not submit message" });
  } catch (err) {
    response.status(404).send(err);
  }
});

router.post("/login", async (request, response) => {
  let username = request.body.username;
  let password = request.body.password;
  try {
    let result = await db.getUser(username);
    console.log;
    if (result) {
      let hashResult = await bcrypt.compare(password, result.password);
      if (hashResult) {
        const token = jwtoken.sign({ username }, process.env.JWT_SECRET, {
          expiresIn: "10m",
        });
        return response.status(200).send({ token });
      }
    }
  } catch (err) {
    response.status(404).send(err);
  }
});

router.post("/user", async (request, response) => {
  let username = request.body.username;
  let password = request.body.password;
  let saltRounds = Number(process.env.BCRYPT_ROUNDS);
  try {
    let passwordHash = await bcrypt.hash(password, saltRounds);
    let result = await db.addUser(username, passwordHash);
    if (result.insertedCount) {
      response.status(201).send({ message: "user account created" });
    }
    response.status(400).send({ error: "could not create user" });
  } catch (err) {
    response.status(404).send(err);
  }
});

router.post("/user", async (request, response) => {
  try {
    if (result.insertedCount) {
      response.status(201).send({ message: "user account created" });
    }
    response.status(400).send({ error: "could not create user" });
  } catch (err) {
    response.status(404).send(err);
  }
});

router.get("/dashboard", async (request, response) => {
  try {
    let data = await db.getAll();
    response.status(200).send(data);
  } catch (err) {
    response.status(404).send(err);
  }
});

router.post("/home-dashboard", async (request, response) => {
  try {
    let result = db.editHomeData(request.body.homePageData);
    if (result.insertedCount) {
      response.status(200).send({ message: "Home page updated" });
    }
  } catch (err) {
    response.status(404).send(err);
  }
});

export default router;
