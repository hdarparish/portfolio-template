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

export default {
  getHomeData,
};
