const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

// Generate JWT
const generateToken = (res, userId) => {
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });

    // Store token in HTTP-only cookie
    res.cookie("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Use secure cookies in production
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
};

// @desc Register a new uer
// @route POST /auth/register
// @access Public
const registerUser = async (req,res) => {
    
    const {name,email, password, role} = req.body;

    

    if(!name || !email || !password){
        return res.status(400).json({error: "Please provide all required fields"})
    }


    const userExists = await User.findOne({email})

    if(userExists){
        return res.status(400).json({error: "User already exist"})
    }
    

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt)
     
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        role
    })

    if(user) {
        generateToken(res, user._id);
        res.status(201).json({
            Id: user._id,
            name: user.name,
            email: user.email,
            role: user.role

        });
    } else {
        res.status(400).json("Invalid user data")
    }

}



// @desc Login a new uer
// @route POST /auth/login
// @access Public
const loginUser = async (req,res) => {
   
   const {email, password} = req.body;
   const user = await User.findOne({email})

   if(user && (await bcrypt.compare(password, user.password))) {
    generateToken(res, user._id);
    res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
    });
   } else {
    return res.status(400).json({error: "Invalid credentials"})
   }
}

// LogOUT User
const logoutUser = async (req,res) => {
       res.cookie("jwt", "", {httpOnly: true, expiress: new Date(0)})
       res.json({message: "Logged out successfully"})
}







module.exports = {
    registerUser, loginUser, logoutUser
}