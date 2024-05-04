// const User = require("../models/user")

// const registeUser = async (req , res) =>{
//     try {
//         //destruc of req param
//         const {name , password , email , mobile} = req.body;
//         if(!name || !email || !password || !mobile){
//             return res.status(400).json({
//                 errorMessage : "Bad request",
//             });
//         }
      
//         //dedicated libs for validate reqBody
//         // yup , joi , express validator

//         res.json({ message : "User resgiterd Succesfuuly !"})
//     } catch (error) {
//         res.status(500).json({ errorMessage : "something went wrong !"})
//     }

//     //checking of email in DB
//     const isExistingUser = await User.findOne({email : email});
//     if(isExistingUser) {
//         return res.status(409).json({
//             message : "user already exists"
//         });
//     }


//     //
//     const userData = new User({
//         name,
//         email,
//         password,
//         mobile,
//     });

//     await userData.save();


//     res.json({
//         message : "user registerd succesfully"
//     })

// }   


// module.exports = {
//     registeUser,
// };

const User = require("../models/user");
const bcrypt = require("bcrypt");
const registeUser = async (req, res) => {
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
        // Handle errors
        console.error(error);
        res.status(500).json({
            errorMessage: "Something went wrong!",
        });
    }
};

const loginUser = async (req , res) => {
    const {password , email } = req.body;

    try {
        if(!password || !email) {
            return res.status(400).json({
                errorMessage : "Bad request"
            })
        }

        
        //checking of user exist or not 
        const userDetails = await User.findOne({email : email})

        //comparing the password 
        const isPasswordMatched = await bcrypt.compare(password , userDetails.password);



        if (!userDetails) {
            return res.status(409).json({
                errorMessage : "User Doesn't exist"
            })
        }

        if(!isPasswordMatched) {
            return res.status(401).json({
                errorMessage : "Inavalid Credentials"
            });
        }

        res.json({
            message : "User loged in"
        })
    } catch (error) {
        res.status(500).json({ errorMessage :  "Something went Wrong !"});
    }
}

module.exports = {
    registeUser,
    loginUser,
};
