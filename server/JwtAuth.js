const jwt = require('jsonwebtoken')

exports.AuthenticateToken = (req,res,next)=>{
    const token = req.cookies.Authentication
    if(!token) return res.status(401).json({"message":"you are not authenticated"})
    jwt.verify(token, 'your-secret-key',(err,data)=>{
        if(err) return res.status(403).json({"message":"Token is not valid!"})
        req.user = data
        console.log(typeof(data))
        next()
    })
}