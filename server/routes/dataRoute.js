const router = require('express').Router();
const dataController = require("../Controller/dataController");

router.post("/addQuestion/:doc_id", dataController.createData)
router.get("/data/:doc_id", dataController.getData)
router.delete("/deleteForm/:doc_id", dataController.deleteData)

module.exports = router;