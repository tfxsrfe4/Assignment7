const { getDB } = require("../config/db");

async function insertLog(req, res, next) {
  try {
    const log = req.body && Object.keys(req.body).length
      ? req.body
      : { message: "Sample log", createdAt: new Date() };
    if (!log.createdAt) log.createdAt = new Date();
    const result = await getDB().collection("logs").insertOne(log);
    res.status(201).json({ message: "Log inserted.", insertedId: result.insertedId });
  } catch (err) { next(err); }
}

module.exports = { insertLog };
