'use strict';

const db = require('../models/index');
const lib = new require('../lib/lib');

// login
exports.LoginPost = async (req, res) => {
    try{
        let username = req.body.username;
        let passwordHash = await lib.passwordHash(req.body.password);
        
        var user = await db.Admin.findOne({
            where: {
                username: username,
                password: passwordHash
            }
        });
        if(user){
            const inforLogin = {
                username: username, 
                permissions: user.permissions, 
                create: user.create == 1 ? true : false, 
                update: user.modify == 1 ? true : false, 
                delete: user.delete == 1 ? true : false
            };
            console.log(inforLogin);
            var token = lib.generateAuthToken(inforLogin, process.env.JWT_KEY);
            return res.send({islogin: true, token: token});
        }else{
            return res.send({islogin: false});
        }
    }
    catch(error){
        console.log(error);
        res.status(400).send(error);
    } 
}

// logout




