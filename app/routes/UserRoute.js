const router = require("express").Router();
const UserController = require("../controllers/UserController");

router.get("/", UserController.getUser);
router.put("/updatePassword/:id", UserController.updatePassword);
router.delete("/deleteAccount/:id", UserController.deleteUser);

module.exports = router;
