const router = require("express").Router();
const c = require("../controllers/collection.controller");

router.post("/books", c.createBooks);
router.post("/authors", c.createAuthors);
router.post("/logs/capped", c.createCappedLogs);
router.post("/books/index", c.createBooksIndex);

module.exports = router;
