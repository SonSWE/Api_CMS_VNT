'use strict';

const { object } = require('webidl-conversions');
const db = require('../models/index');
const lib = new require('../lib/lib');

// login
exports.LoginPost = async (req, res) => {
    try{
        let username = req.body.username;
        let passwordHash = await lib.passwordHash(req.body.password);
        var user = await db.Admin.findOne({where: {username: username, password: passwordHash }});
        if(user){
            var per = await db.Permissions.findOne({where: {id: user.idPermissions}});
            var perDetail = await db.PermissionsDetail.findAll( {where: {idPermissions: per.id}}, {attributes: ['actionName', 'checkAction']});//, 
            var inforLogin = {
                username: username,
                name: user.name,
                PermissionsName: per.name
            };
            for(let i = 0; i<perDetail.length; i++)
            {
                inforLogin[perDetail[i].actionName] = perDetail[i].checkAction;
            }
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




