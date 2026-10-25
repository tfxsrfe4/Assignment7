const router = require("express").Router();
const c = require("../controllers/books.controller");

router.post("/", c.insertOne);
router.post("/batch", c.insertMany);
router.patch("/Future", c.updateFuture);
router.get("/title", c.findByTitle);
router.get("/year", c.findByYearRange);
router.get("/genre", c.findByGenre);
router.get("/skip-limit", c.skipLimit);
router.get("/year-integer", c.yearInteger);
router.get("/exclude-genres", c.excludeGenres);
router.delete("/before-year", c.deleteBeforeYear);
router.get("/aggregate1", c.aggregate1);
router.get("/aggregate2", c.aggregate2);
router.get("/aggregate3", c.aggregate3);
router.get("/aggregate4", c.aggregate4);

module.exports = router;
