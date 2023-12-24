const router = require('express').Router();
const userController = require("../Controller/userController");

router.post("/:doc_id", userController.createAnswer)

module.exports = router;