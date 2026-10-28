const user = require("../models/user.js")

const  bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.js");

const signup = async(req, res) => {
    try{
        const {name, email, password, role} = req.body;
        if(!name || !email || !password || !role) {
           return res.json({message: "all fields are required", success: false});
        }

        const user = await User.findOne({email});
        if(user) {
           return  res.json({ message: "user already exists", success:  false });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User({
           name,
           email,
           password: hashedPassword,
           role,
        });
        await newUser.save();
        res.json({ message: "user created successfully", success: true});
    } catch (error) {
        return res.json({message: "internal server error", success: false });   
   }
}

// login 

const login = async (req, res) => {
    try {
        const {email, password} = req.body;

        if(!email || !password) {
           return res.json({message: "all field are required", success: false });
        }
        const user = await User.findOne({email});
        if(!user) {
            return res.json({message: "user does not exists", success: false}) 
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
           return res.json({message: "invalid password", success: false});
        }
        const token = jwt.sign({
            id: user._id , role: user.role },
             process.env.JWT_SECRET, 
             {
               expiresIn: "1d",
             }
        );
        res.cookie("token", token, {
           httpOnly: true,
           secure: true,      // Required for HTTPS on Render
           sameSite: "none",
           maxAge: 24 * 60 * 60 * 1000, 
        });
        return res.json({message: "login successfully", success: true, user});
        }catch (error) {
           res.status(400).json({message: "internal server error", success: false});
         }
    }

      // logout

    const logout = async (req, res)=> {
    try {
        // MATCH the same options when clearing cross-site cookies:
        res.clearCookie("token", {
            secure: true,
            sameSite: "none"
        });
        return res.json({success: "logout successfully", message: true});
    } catch (error) {
        return res.json({ message: "internal server error", success: false});
    }
};


    // isAuth middleware
    const isAuth = async (req, res, next) => {
        const {id} = req.user;
        const user = await User.findById(id).select("-password");
        try {
           res.status(200).json({success: true, user});
        } catch (error) {
            return res.json({ message: "internal server error", success: false});
        }
    }

    module.exports = { signup, login, logout, isAuth };