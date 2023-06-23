const router = require("express").Router();
const GenerateImageController = require("../controllers/GenerateImageController");

router.get("/", GenerateImageController.fetchAll);
router.post("/", GenerateImageController.store);
router.delete("/:userId", GenerateImageController.clearAll);

module.exports = router;
