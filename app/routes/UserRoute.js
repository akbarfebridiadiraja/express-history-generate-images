const router = require("express").Router();
const UserController = require("../controllers/UserController");

router.get("/:id", UserController.getUser);
router.put("/:id/updatePassword", UserController.updatePassword);
router.delete("/:id/deleteAccount", UserController.deleteUser);

module.exports = router;
