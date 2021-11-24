'use strict';

const jwt = require('jsonwebtoken')
const verifyToken = (req, res, next) => {
    const authHeader = req.header('authorization');
    const token = authHeader &&  authHeader.split(' ')[1];
    if(!token) return res.status(401);
    try{
        jwt.verify(token, process.env.JWT_KEY, (err, data)=>{
            console.log(err, data);
            if(err) res.status(403).send({err});
            next(); 
        })
    }catch(err){
        return res.status(500).send({err});
    }  
}   
module.exports = verifyToken;
