const jwt = require("jsonwebtoken")
function validarToken(req,res,next){
    const token = req.headers["x-access-token"]
    if(!token){
        return res.status(401).json({status:false,msg:"No token"})
    }
    req["user"] = jwt.verify(token,process.env.KEY_JWT)["user"]
    next();
}

module.exports = validarToken