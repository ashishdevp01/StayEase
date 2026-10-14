const Room = require("../models/room.model.js");
const { cloudinary } = require("../cloudConfig.js");

// add a new hotel room

const addRoom = async (req, res) => {
    try {
      const { roomType, pricePerNight, description, amenities, isAvailable, hotel } = req.body;
       if(!roomType || !pricePerNight || !description || isAvailable === undefined || !amenities || !hotel) {
        return res.status(400).json({
            message: "All fields are required",
            success: false
        });
       }
      const newRoom = await  Room.create({
        hotel: hotel,
        roomType, 
        pricePerNight,
        description,
        isAvailable,
        amenities: amenities.split(",").map(amenity => amenity.trim()),
        images:  req.files.map(file => ({
            url: file.path,
            filename: file.filename
    }))
//     images: req.files.map(file => ({
//   filename: file.originalname,
//   url: "temporary"
// }))
        }); 
        res.status(201).json({
            message: "Room added successfully",
            success: true,
            room: newRoom
      })
     } catch (error) {
    console.log("FULL ERROR:", error);
    console.log("ERROR MESSAGE:", error.message);
    console.log("ERROR STACK:", error.stack);

    return res.status(500).json({
        success: false,
        message: error.message || "Something went wrong",
    });
}
    }

// get all rooms for a specific owner's hotel

const  getOwnerRooms = async (req, res) => {
    try {
       const { id } = req.user;
       const rooms = await Room.find().populate({
        path: "hotel",
        match: { owner: id },
        select: "hotelName hotelAddress  rating  amenities"
       });
       const ownerRooms = rooms.filter((room) => room.hotel.owner === id);
       return res.status(200).json({
        message: "Rooms fetched successfully",
        success: true,
        rooms: ownerRooms,
       })

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// get all rooms

const getAllRooms = async (req, res) =>{
   try {
     const rooms = await Room.find().populate({
        path: "hotel",
        select: "hotelName hotelAddress  rating  amenities owner",
        populate: {
            path: "owner",
            select: "name email",
       },  
     })
     .exec();
     res.status(200).json({
        message: "Rooms fetched successfully",
        success: true,
        rooms: rooms
      })
   } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// delete a room
const deleteRoom = async (req, res) => {
    try {
        const { id } = req.params;

        // Find room first
        const room = await Room.findById(id);

        if (!room) {
            return res.status(404).json({
                message: "Room not found",
                success: false
            });
        }

           
        // Delete all images from Cloudinary
        for (const image of room.images) {
             
             await cloudinary.uploader.destroy(image.filename);
        }

        // Delete room from MongoDB
        await Room.findByIdAndDelete(id);

        res.status(200).json({
            message: "Room and images deleted successfully",
            success: true
        });

    } catch (error) {
        
        res.status(500).json({
            message: error.message,
            success: false
        });
    }
};

module.exports = { addRoom, getOwnerRooms, getAllRooms, deleteRoom };