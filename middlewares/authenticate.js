const jwt = require('jsonwebtoken');

exports.authenticated = (req,res,nex)=>{
    try {
        const authHeader = req.get("Athorization");

        if(!authHeader){
            res.status(401).json({
                success:false,
                message:"شما مجوز دسترسی به این بخش را ندارید"
            })
        }
        const token = authHeader.split(" ")[1];

        const decodedToken = jwt.verify(token,process.env.JWT_SECRET)
        if(!decodedToken){
            res.status(401).json({
                success:false,
                message:"شما مجوز دسترسی به این بخش را ندارید"
            })
        }
        req.userId = decodedToken.user.id;
        next()

    } catch (error) {
        next(error)
        console.log(error)
    }
}