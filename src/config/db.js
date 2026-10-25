const { MongoClient } = require("mongodb");

let client;
let db;

async function connectDB() {
  const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017";
  const dbName = process.env.DB_NAME || "assignment7";

  client = new MongoClient(uri);
  await client.connect();
  db = client.db(dbName);
  console.log(`MongoDB connected: ${dbName}`);
  return db;
}

function getDB() {
  if (!db) throw new Error("Database is not connected yet.");
  return db;
}

async function closeDB() {
  if (client) await client.close();
}

module.exports = { connectDB, getDB, closeDB };
