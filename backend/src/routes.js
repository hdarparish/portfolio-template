import express, { request, response } from "express";
import dotenv from "dotenv";
import db from "./db";
import bcrypt from "bcrypt";
import * as jwtoken from "jsonwebtoken";
import {verifyToken} from "./verifyJWT"

dotenv.config();
const router = express.Router();

router.get("/", async (request, response) => {
  try {
    let data = await db.getHomeData();
    return response.status(200).send(data);
  } catch (err) {
    return response.status(404).send(err);
  }
});
router.get("/projects", async (request, response) => {
  try {
    let data = await db.getProjectsData();
    return response.status(200).send(data);
  } catch (err) {
    return response.status(404).send(err);
  }
});

router.put("/projects", async (request, response) => {
  try {
    let result = await db.editProjectData(request.body.projectForm);
    /*     if (result) {
      return response.status(200).send({ message: "Project Updated" });
    } */
    return response.status(200).send({ message: "Project Updated" });
    //return response.status(400).send({ error: "could not submit message" });
  } catch (err) {
    return response.status(404).send(err);
  }
});

router.post("/projects", async (request, response) => {
  try {
    let result = await db.addProjectData(request.body.projectForm);
    if (result) {
      return response.status(200).send({ message: "Project added" });
    }

    return response.status(400).send({ error: "could not submit message" });
  } catch (err) {
    return response.status(404).send(err);
  }
});

router.delete("/projects/:id", async (request, response) => {
  try {
    let projectId = request.params.id;
    let result = await db.deleteProjectData(projectId);
    if (result) {
      return response.status(200).send({ message: "Project added" });
    }

    return response.status(400).send({ error: "could not submit message" });
  } catch (err) {
    return response.status(404).send(err);
  }
});

router.post("/contact", async (request, response) => {
  try {
    let result = await db.addContactInfo(request.body.contactInfo);
    if (result.insertedCount) {
      return response.status(200).send({ message: "message sent" });
    }
    return response.status(400).send({ error: "could not submit message" });
  } catch (err) {
    return response.status(404).send(err);
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
          expiresIn: "3m",
        });
        return response.status(200).send({ token });
      }
    }
  } catch (err) {
    return response.status(404).send(err);
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
      return response.status(201).send({ message: "user account created" });
    }
    response.status(400).send({ error: "could not create user" });
  } catch (err) {
    return response.status(404).send(err);
  }
});

router.post("/user", async (request, response) => {
  try {
    if (result.insertedCount) {
      return response.status(201).send({ message: "user account created" });
    }
    response.status(400).send({ error: "could not create user" });
  } catch (err) {
    return response.status(404).send(err);
  }
});

router.get("/dashboard",  async (request, response) => {
  try {
    let data = await db.getAll();
    return response.status(200).send(data);
  } catch (err) {
    return response.status(404).send(err);
  }
});

router.post("/home-dashboard", async (request, response) => {
  try {
    let result = await db.editHomeData(request.body.homePageData);
    if (result) {
      return response.status(200).send({ message: "Home page updated" });
    }
    return response.status(400).send({ message: "could not update" });
  } catch (err) {
    return response.status(404).send(err);
  }
});

export default router;
