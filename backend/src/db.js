import { MongoClient } from "mongodb";
import assert from "assert";
import dotenv from "dotenv";

dotenv.config();

const url = process.env.DB_PORT;

// Database Name
const dbName = process.env.DB_NAME;
const client = new MongoClient(url);
// Use connect method to connect to the server
client.connect((err) => {
  assert.strictEqual(null, err);
  console.log("Connected successfully to server");
  client.close();
});

const getHomeData = async () => {
  const client = await MongoClient.connect(url, {
    useNewUrlParser: true,
  }).catch((err) => {
    console.log(err);
  });

  if (!client) {
    return;
  }
  try {
    const db = client.db(dbName);
    let collection = db.collection("home");

    let result = await collection.find().toArray();

    return result[0];
  } catch (err) {
    console.log(err);
  } finally {
    client.close();
  }
};

const getProjectsData = async () => {
  const client = await MongoClient.connect(url, {
    useNewUrlParser: true,
  }).catch((err) => {
    console.log(err);
  });

  if (!client) {
    return;
  }
  try {
    const db = client.db(dbName);
    let collection = db.collection("projects");

    let result = await collection.find().toArray();
    return result;
  } catch (err) {
    console.log(err);
  } finally {
    client.close();
  }
};

const addContactInfo = async (data) => {
  const client = await MongoClient.connect(url, {
    useNewUrlParser: true,
  }).catch((err) => {
    console.log(err);
  });

  if (!client) {
    return;
  }
  try {
    const db = client.db(dbName);
    let collection = db.collection("contactForm");

    let result = await collection.insertOne(data);
    return result;
  } catch (err) {
    console.log(err);
  } finally {
    client.close();
  }
};

const getContantInfo = async () => {
  const client = await MongoClient.connect(url, {
    useNewUrlParser: true,
  }).catch((err) => {
    console.log(err);
  });

  if (!client) {
    return;
  }
  try {
    const db = client.db(dbName);
    let collection = db.collection("contactForm");

    let result = await collection.find().toArray();
    return result;
  } catch (err) {
    console.log(err);
  } finally {
    client.close();
  }
};

const addUser = async (username, password) => {
  const client = await MongoClient.connect(url, {
    useNewUrlParser: true,
  }).catch((err) => {
    console.log(err);
  });

  if (!client) {
    return;
  }
  try {
    const db = client.db(dbName);
    let collection = db.collection("users");
    await collection.insertOne({ username, password });
  } catch (err) {
    console.log(err);
  } finally {
    client.close();
  }
};

const getUser = async (username) => {
  const client = await MongoClient.connect(url, {
    useNewUrlParser: true,
  }).catch((err) => {
    console.log(err);
  });

  if (!client) {
    return;
  }
  try {
    const db = client.db(dbName);
    let collection = db.collection("users");

    let result = await collection.find(username).toArray();
    return result[0];
  } catch (err) {
    console.log(err);
  } finally {
    client.close();
  }
};

const getAllUsers = async () => {
  const client = await MongoClient.connect(url, {
    useNewUrlParser: true,
  }).catch((err) => {
    console.log(err);
  });

  if (!client) {
    return;
  }
  try {
    const db = client.db(dbName);
    let collection = db.collection("users");

    let result = await collection.find().toArray();
    return result;
  } catch (err) {
    console.log(err);
  } finally {
    client.close();
  }
};

const getAll = async () => {
  let homeData = await getHomeData();
  let projectData = await getProjectsData();
  let contactEntries = await getContantInfo();
  let loginUsers = await getAllUsers();
  return { homeData, projectData, contactEntries, loginUsers };
};

export default {
  getHomeData,
  getProjectsData,
  addContactInfo,
  addUser,
  getUser,
  getAll,
};
