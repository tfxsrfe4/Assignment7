const { getDB } = require("../config/db");

async function createBooks(req, res, next) {
  try {
    const db = getDB();
    const existing = await db.listCollections({ name: "books" }).hasNext();
    if (existing) return res.status(200).json({ message: "Collection books already exists." });

    await db.createCollection("books", {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["title"],
          properties: {
            title: { bsonType: "string", minLength: 1, description: "title must be a non-empty string" }
          }
        }
      },
      validationLevel: "strict",
      validationAction: "error"
    });
    res.status(201).json({ message: "Explicit books collection created with title validation." });
  } catch (err) { next(err); }
}

async function createAuthors(req, res, next) {
  try {
    const db = getDB();
    const author = req.body && Object.keys(req.body).length ? req.body : { name: "Aldous Huxley" };
    const result = await db.collection("authors").insertOne(author);
    res.status(201).json({ message: "Implicit authors collection created by inserting a document.", insertedId: result.insertedId });
  } catch (err) { next(err); }
}

async function createCappedLogs(req, res, next) {
  try {
    const db = getDB();
    const exists = await db.listCollections({ name: "logs" }).hasNext();
    if (exists) return res.status(200).json({ message: "logs collection already exists; it was not recreated." });
    await db.createCollection("logs", { capped: true, size: 1024 * 1024 });
    res.status(201).json({ message: "Capped logs collection created with a 1 MB size limit." });
  } catch (err) { next(err); }
}

async function createBooksIndex(req, res, next) {
  try {
    const result = await getDB().collection("books").createIndex({ title: 1 });
    res.json({ message: "Index created.", indexName: result });
  } catch (err) { next(err); }
}

module.exports = { createBooks, createAuthors, createCappedLogs, createBooksIndex };
