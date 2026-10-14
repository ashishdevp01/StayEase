const express = require("express");
const { signup, login, logout, isAuth } = require("../controllers/user.js");
const isAuthenticated = require("../middlewares/isAuthenticated.js");
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", isAuthenticated, logout);
router.post("/is-auth", isAuthenticated, isAuth);

module.exports = router;