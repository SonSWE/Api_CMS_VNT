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
        var per = await db.Permissions.findOne({
            where: {
                id: user.permissions_id
            }
        });
        if(user){
            var token = lib.generateAuthToken({username: username, permissions: per.key}, process.env.JWT_KEY);
            return res.send({islogin: true, token: token});
        }else{
            return res.send({islogin: false});
        }
    }
    catch(error){
        res.status(400).send(error);
    } 
}

// logout




