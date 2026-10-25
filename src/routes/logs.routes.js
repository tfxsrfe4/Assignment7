const router = require("express").Router();
const c = require("../controllers/logs.controller");
router.post("/", c.insertLog);
module.exports = router;
