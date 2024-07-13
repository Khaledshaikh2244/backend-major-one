
const User = require("../models/user");
const jwt = require ("jsonwebtoken");
const bcrypt = require("bcrypt");
const registeUser = async (req, res , next) => {
    try {
        // Destructure the request body
        const { name, password, email, mobile } = req.body;
        if (!name || !email || !password || !mobile) {
            return res.status(400).json({
                errorMessage: "Bad request",
            });
        }

        // Check if the email already exists in the database
        const isExistingUser = await User.findOne({ email: email });
        if (isExistingUser) {
            return res.status(409).json({
                message: "User already exists",
            });
        }

        
        const hashedPassword = await bcrypt.hash(password , 10);

        // Create a new user instance
        const userData = new User({
            name,
            email,
            password : hashedPassword,
            mobile,
        });

        // Save the user data to the database
        await userData.save();

        // Send success response
        res.json({
            message: "User registered successfully",
        });
    } catch (error) {
        // // Handle errors
        // console.error(error);
        // res.status(500).json({
        //     errorMessage: "Something went wrong!",
        // });
        next(error);
    }
};

const loginUser = async (req , res , next) => {
    const {password , email } = req.body;

    try {
        if(!password || !email) {
            return res.status(400).json({
                errorMessage : "Bad request"
            })
        }

        
        //checking of user exist or not 
        const userDetails = await User.findOne({email : email})


        if (!userDetails) {
            return res.status(409).json({
                errorMessage : "User Doesn't exist"
            })
        }

        //comparing the password 
        const isPasswordMatched = await bcrypt.compare(password , userDetails.password);

        if(!isPasswordMatched) {
            return res.status(401).json({
                errorMessage : "Inavalid Credentials"
            });
        }

        //sign accepts 3 params
        //reqPay , secretKey
        //storing user id in reqPayL
        //generating the toke using jwt.sign() based on provided payload, secret key..
        const token = jwt.sign({userId : userDetails._id } ,
             process.env.SECRET_KEY,
             {expiresIn : "60h"}
             );

        res.json({
            message : "User loged in",
            //return the token after gener
            token : token,
            name : userDetails.name,
        })
    } catch (error) {
        // res.status(500).json({ errorMessage :  "Something went Wrong !"});
        next(error);
    }
}

module.exports = {
    registeUser,
    loginUser,
};
