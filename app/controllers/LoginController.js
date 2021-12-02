'use strict';

const db = require('../models/index');
const lib = new require('../lib/lib');

// login
exports.LoginPost = async (req, res) => {
    try{
        let username = req.body.username;
        let passwordHash = await lib.passwordHash(req.body.password);
        var user = await db.Admin.findOne({where: {username: username, password: passwordHash }});
        if(user){
            var adminPer = await db.AdminPermissions.findOne({where: {usernameAdmin: username}});
            var per = await db.Permissions.findOne({where: {id: adminPer.idPermisions}});
            var perDetail = await db.PermissionsDetail.findAll({attributes: ['actionName', 'actionCode', 'checkAction']}, {where: {idPermisions: per.id}});
            const inforLogin = {
                username: username,
                PermissionsName: per.name,
                Detail: perDetail
            };
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




