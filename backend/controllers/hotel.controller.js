
const Hotel = require("../models/hotel.model.js");
const { cloudinary } = require("../cloudConfig.js");



const registerHotel = async (req, res) => {
    try {
        // Check authenticated user
        if (!req.user || !req.user.id) {
            return res.status(401).json({
                message: "User is not authenticated",
                success: false
            });
        }

        const { id } = req.user;

        // Get data from form
        const {
            hotelName,
            hotelAddress,
            rating,
            price,
            amenities
        } = req.body;

        // Check all fields
        if (
            !hotelName ||
            !hotelAddress ||
            !rating ||
            !price ||
            !amenities
        ) {
            return res.status(400).json({
                message: "All fields are required",
                success: false
            });
        }

        // Check image
        if (!req.file) {
            return res.status(400).json({
                message: "Image is required",
                success: false
            });
        }

        // Cloudinary image information
        const image = {
            url: req.file.path,
            filename: req.file.filename
        };

        // Convert amenities string into array
        const amenitiesArray = amenities
            .split(",")
            .map(item => item.trim())
            .filter(item => item !== "");

        // Create hotel
        const newHotel = new Hotel({
            hotelName,
            hotelAddress,
            image,
            rating,
            price,
            amenities: amenitiesArray,
            owner: id
        });

        // Save hotel
        await newHotel.save();

        return res.status(201).json({
            message: "Hotel registered successfully",
            success: true,
            hotel: newHotel
        });

    } catch (error) {
        console.log("REGISTER HOTEL ERROR:", error);

        return res.status(500).json({
            message: error.message,
            success: false
        });
    }
};


const getOwnerHotels = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({
                message: "User is not authenticated",
                success: false
            });
        }

        const { id } = req.user;

        const hotels = await Hotel
            .find({ owner: id })
            .populate("owner", "name email");

        return res.status(200).json({
            message: "Hotels fetched successfully",
            success: true,
            hotels
        });

    } catch (error) {
        console.log("GET OWNER HOTELS ERROR:", error);

        return res.status(500).json({
            message: error.message,
            success: false
        });
    }
};



const getAllHotels = async (req, res) => {
    try {
        const hotels = await Hotel
            .find()
            .populate("owner", "name email");

        return res.status(200).json({
            message: "Hotels fetched successfully",
            success: true,
            hotels
        });

    } catch (error) {
        console.log("GET ALL HOTELS ERROR:", error);

        return res.status(500).json({
            message: error.message,
            success: false
        });
    }
};



const deleteHotel = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({
                message: "User is not authenticated",
                success: false
            });
        }

        const { hotelId } = req.params;
        const userId = req.user.id;

        // Find hotel
        const hotel = await Hotel.findById(hotelId);

        if (!hotel) {
            return res.status(404).json({
                message: "Hotel not found",
                success: false
            });
        }

        // Check owner
        if (hotel.owner.toString() !== userId.toString()) {
            return res.status(401).json({
                message: "Unauthorized",
                success: false
            });
        }

       // Delete image from Cloudinary and hotel from database
        if (hotel.image && hotel.image.filename) {
            await cloudinary.uploader.destroy(hotel.image.filename);
        }
        await Hotel.findByIdAndDelete(hotelId);

        return res.status(200).json({
            message: "Hotel deleted successfully",
            success: true
        });

    } catch (error) {
        console.log("DELETE HOTEL ERROR:", error);

        return res.status(500).json({
            message: error.message,
            success: false
        });
    }
};




module.exports = {
    registerHotel,
    getOwnerHotels,
    getAllHotels,
    deleteHotel
};
