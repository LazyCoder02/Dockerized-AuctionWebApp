const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/", userController.addUser);
router.put("/:id", userController.editUser);
router.delete("/:id", userController.deleteUser);
router.get("/:id", userController.getUser);
router.get("/", userController.getAllUsers);
router.post("/login", userController.loginUser);

module.exports = router;
