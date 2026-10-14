const express = require("express");
const isAuthenticated = require("../middlewares/isAuthenticated.js");
const isOwner = require("../middlewares/isOwner.js");
const { addRoom, getOwnerRooms, getAllRooms, deleteRoom  } = require("../controllers/room.controller.js");
const upload = require("../config/multer.js");

const roomRouter = express.Router();

roomRouter.post(
    "/add",
    isAuthenticated,
    isOwner,
     upload.array("images", 4),
    addRoom
);

roomRouter.get("/get", isAuthenticated, isOwner, getOwnerRooms);
roomRouter.get("/get-all", getAllRooms);
roomRouter.delete("/delete/:id", isAuthenticated, isOwner, deleteRoom);

module.exports = roomRouter;