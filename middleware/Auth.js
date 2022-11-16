const jwt = require("jsonwebtoken");
// const BlogModel = require("../Models/blogModel");
// const validator = require("validator");


exports.authentication = async function ( req, res, next){
    try{
        // check token
        let token = req.headers["x-api-key"];
        // if(!token) req.headers["x-api-key"];
        if(!token) 
        return res.status(401).send({status: false, msg: "You are not logged in"})

        // verify token
        let decodedToken = jwt.verify(token, "my-cool-password");
        console.log(decodedToken)
        if(!decodedToken)
        return res.status(400).send({status: false, msg: "You are not authorised"});
        req.authorId = decodedToken.authorId
        next();
    }
    catch(err){
        res.status(500).send({status: false, msg:err.message })
    }
}