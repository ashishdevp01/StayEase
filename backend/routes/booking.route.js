const express = require("express");
const isAuthenticated = require("../middlewares/isAuthenticated.js");
const isOwner = require("../middlewares/isOwner.js");
const {checkAvailabity, checkRoomAveailability, bookRoom, getUserBookings, getHotelBookings, stripePayment } = require("../controllers/booking.controller.js");
// const upload = require("../config/multer.js");

const bookingRouter = express.Router();

bookingRouter.post("/check-availability", checkRoomAveailability);
bookingRouter.post("/book", isAuthenticated, bookRoom );
bookingRouter.get("/user", isAuthenticated, getUserBookings );
bookingRouter.get("/hotel", isAuthenticated, isOwner, getHotelBookings );
bookingRouter.post("/stripe-payment", isAuthenticated,  stripePayment );

module.exports = bookingRouter;