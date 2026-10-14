
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
 const dotenv = require("dotenv");
  dotenv.config();
const { connectDB } = require("./config/db.js");
const userRoutes = require("./routes/user.js");
const hotelRouter = require("./routes/hotel.route.js");
const roomRouter = require("./routes/room.routes.js");
const  bookingRouter = require("./routes/booking.route.js");


const app = express();

connectDB();

app.use(express.json());
app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://stay-ease-booking.vercel.app"
    ],
    credentials: true
}));
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("this is home page");
});
// app.use("/images", express.static("images"));
app.use("/api/user", userRoutes);
app.use("/api/hotel", hotelRouter);
app.use("/api/room", roomRouter);
app.use("/api/bookings", bookingRouter);
// app.use("/api/user", userRoutes);


app.use((err, req, res, next) => {
    console.log("========== ERROR ==========");
    console.log("Error:", err);
    console.log("Message:", err.message);
    console.log("Stack:", err.stack);
    console.log("===========================");

    res.status(500).json({
        success: false,
        message: err.message || "Something went wrong",
    });
});

const PORT = 4000;

app.listen(PORT, () => {
    console.log(`server is listening on port ${PORT}`);
});

