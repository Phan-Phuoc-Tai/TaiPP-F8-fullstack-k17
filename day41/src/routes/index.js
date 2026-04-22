const express = require("express");
const homeController = require("../controllers/home.controller");
const userController = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();
router.get("/", authMiddleware, homeController.index);

router.get("/login", userController.index);

router.post("/login", userController.login);

router.post("/logout", userController.logout);
module.exports = router;
