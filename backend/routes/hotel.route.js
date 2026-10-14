
const express = require("express");
const isAuthenticated = require("../middlewares/isAuthenticated.js");
const isOwner = require("../middlewares/isOwner.js");
const { registerHotel, getOwnerHotels,getAllHotels,deleteHotel } = require("../controllers/hotel.controller.js");
const upload = require("../config/multer.js");

const hotelRouter = express.Router();


hotelRouter.post(
    "/register",
    upload.single("image"),
    isAuthenticated,
    isOwner,
    registerHotel
);


// get hotels route

hotelRouter.get("/get", isAuthenticated, isOwner, getOwnerHotels);
hotelRouter.get("/get-all", getAllHotels);
hotelRouter.delete("/delete/:hotelId", isAuthenticated, isOwner, deleteHotel);


module.exports = hotelRouter;