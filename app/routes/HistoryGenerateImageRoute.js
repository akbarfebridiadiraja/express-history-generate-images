const router = require("express").Router();
const HistoryGenerateImageController = require("../controllers/HistoryGenerateImageController");

router.get("/", HistoryGenerateImageController.fetchAll);
router.post("/", HistoryGenerateImageController.store);
router.delete("/:userId", HistoryGenerateImageController.clearAll);

module.exports = router;
