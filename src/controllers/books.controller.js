const { getDB } = require("../config/db");

function books() { return getDB().collection("books"); }

async function insertOne(req, res, next) {
  try {
    if (!req.body || typeof req.body.title !== "string" || !req.body.title.trim()) {
      return res.status(400).json({ message: "A non-empty title is required." });
    }
    const result = await books().insertOne(req.body);
    res.status(201).json({ message: "Book inserted.", insertedId: result.insertedId });
  } catch (err) { next(err); }
}

async function insertMany(req, res, next) {
  try {
    const data = req.body.books;
    if (!Array.isArray(data) || data.length < 3) {
      return res.status(400).json({ message: "Send { books: [...] } with at least three book records." });
    }
    const invalid = data.some(b => !b || typeof b.title !== "string" || !b.title.trim());
    if (invalid) return res.status(400).json({ message: "Every book must have a non-empty title." });
    const result = await books().insertMany(data);
    res.status(201).json({ message: "Books inserted.", insertedCount: result.insertedCount, insertedIds: result.insertedIds });
  } catch (err) { next(err); }
}

async function updateFuture(req, res, next) {
  try {
    const result = await books().updateOne({ title: "Future" }, { $set: { year: 2022 } });
    res.json({ matchedCount: result.matchedCount, modifiedCount: result.modifiedCount });
  } catch (err) { next(err); }
}

async function findByTitle(req, res, next) {
  try {
    const title = req.query.title;
    if (!title) return res.status(400).json({ message: "Use ?title=Brave%20New%20World" });
    res.json(await books().find({ title }).toArray());
  } catch (err) { next(err); }
}

async function findByYearRange(req, res, next) {
  try {
    const from = Number(req.query.from), to = Number(req.query.to);
    if (!Number.isFinite(from) || !Number.isFinite(to)) return res.status(400).json({ message: "from and to must be numbers." });
    res.json(await books().find({ year: { $gte: from, $lte: to } }).toArray());
  } catch (err) { next(err); }
}

async function findByGenre(req, res, next) {
  try {
    const genre = req.query.genre || "Science Fiction";
    res.json(await books().find({ genres: genre }).toArray());
  } catch (err) { next(err); }
}

async function skipLimit(req, res, next) {
  try {
    const result = await books().find({}).sort({ year: -1 }).skip(2).limit(3).toArray();
    res.json(result);
  } catch (err) { next(err); }
}

async function yearInteger(req, res, next) {
  try {
    res.json(await books().find({ year: { $type: "int" } }).toArray());
  } catch (err) { next(err); }
}

async function excludeGenres(req, res, next) {
  try {
    res.json(await books().find({ genres: { $nin: ["Horror", "Science Fiction"] } }).toArray());
  } catch (err) { next(err); }
}

async function deleteBeforeYear(req, res, next) {
  try {
    const year = Number(req.query.year);
    if (!Number.isFinite(year)) return res.status(400).json({ message: "Provide ?year=2000" });
    const result = await books().deleteMany({ year: { $lt: year } });
    res.json({ deletedCount: result.deletedCount });
  } catch (err) { next(err); }
}

async function aggregate1(req, res, next) {
  try {
    res.json(await books().aggregate([
      { $match: { year: { $gt: 2000 } } },
      { $sort: { year: -1 } }
    ]).toArray());
  } catch (err) { next(err); }
}

async function aggregate2(req, res, next) {
  try {
    res.json(await books().aggregate([
      { $match: { year: { $gt: 2000 } } },
      { $project: { _id: 0, title: 1, author: 1, year: 1 } }
    ]).toArray());
  } catch (err) { next(err); }
}

async function aggregate3(req, res, next) {
  try {
    res.json(await books().aggregate([
      { $unwind: "$genres" }
    ]).toArray());
  } catch (err) { next(err); }
}

async function aggregate4(req, res, next) {
  try {
    res.json(await books().aggregate([
      { $lookup: { from: "logs", localField: "_id", foreignField: "bookId", as: "bookLogs" } }
    ]).toArray());
  } catch (err) { next(err); }
}

module.exports = {
  insertOne, insertMany, updateFuture, findByTitle, findByYearRange,
  findByGenre, skipLimit, yearInteger, excludeGenres, deleteBeforeYear,
  aggregate1, aggregate2, aggregate3, aggregate4
};
