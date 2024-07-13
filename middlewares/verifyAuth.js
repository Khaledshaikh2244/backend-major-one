const jwt  = require ("jsonwebtoken");

//verfy token 

const verifyToken = (req , res, next) => {
    try {
        
        //requesting the toeken
        const token = req.headers.authorization;

        // checking token
        if(!token) {
         return  res.status(401).json({errorMessage : "Unauthorized access"});
        }

        //validate token
        // const decode = jwt.verify(token , process.env.SECRET_KEY);
        const decode = jwt.verify(token, process.env.SECRET_KEY);
        console.log(decode)
    
        //decode which requested via middleware via headers.autho as m full acccess req,res next
        //then set into the 
        //updating the request obj with currentId so that can be used anywhere
        req.currentUserId = decode.userId;
        next();
    } catch (error) {
  return res.status(401).json({message : "Unauthorized access! Invalid Token"});        
    }


}


module.exports = verifyToken;