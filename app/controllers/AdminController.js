'use strict';

const { Sequelize, DataTypes } = require("sequelize");
const Op = Sequelize.Op;
const db = require('../models/index');
const lib =  new require('../lib/lib');

exports.CreateNewAdmin =  async (req, res) => {
    try{
        // create a new admin
        var admin = { username: req.body.username, password: await lib.passwordHash(req.body.password)};
        // create permissions for new admin
        var adminPer = {
            id: parseInt(lib.randomNumber(5)),
            usernameAdmin: admin.username,
            idPermissions: req.body.idPermissions
        }
        // save admin to database
        db.Admin.create(admin)
        .then(data => {
            db.AdminPermissions.create(adminPer)
            .then(data =>{
                res.send({message: "Successful"});
            }); 
        });
    }catch(err){
        res.status(500).send({message: "Error",err});
    }
}

exports.UpdatePassword = async (req, res) => {
    try{
        let username = req.body.username;
        let password = req.body.password;
        var admin = await db.Admin.findOne({
            where: {
                username: username,
                password: await lib.passwordHash(password)
            }
        });
        if(admin){
            let passwordHash = await lib.passwordHash(req.body.newPassword);
            db.Admin.update({password: passwordHash}, {where:{username : username}})
            .then(num => {
                if (num == 1) {
                    res.send({message: "Successful"});
                } else {
                    res.send({ message: `Cannot update Tutorial with id=${username}. Maybe Tutorial was not found or req.body is empty!`});
                }
            });
        } 
    }catch(err){
        res.status(500).send({message: "Error", err});
    }
}

exports.GetListPermissions = async (req, res) => {
    try{
        var listPermissions = await db.Permissions.findAll()
        .then(data => {
            res.send({message: "Successful",ListPermissions: data});
        });
    }catch(err){
        res.status(500).send({message: "Error", err});
    }
}

exports.GetPermissionsDetail = async (req, res) => {
    try{
        var listPermissionsDetail = db.PermissionsDetail.findAll({where: {idPermissions: req.body.idPermissions}}) 
        .then(data=>{
            res.send({message: "Successful", Detail: data});
        });
    }catch(err){
        res.status(500).send({message: "Error", err});
    }
}

exports.GetListAdmin = async (req, res) => {
    try{
        var listAdmin = await db.Admin.findAll({attributes: ['username']})
        .then(data => {
            res.send({message: "Successful", data});
        });
    }catch(err){
        res.status(500).send({message: "Error", err});
    }
}

exports.Find = async (req, res) => {
    try{
        const username = req.body.username;
        var listAdmin = await db.Admin.findAll({attributes: ['username']}, {where: {username: {[Op.regexp]: `(${username})`}}})
        .then(data => {
            res.send({message: "Successful", data});
        });
    }catch(err){
        res.status(500).send({message: "Error", err});
    }
}

exports.Delete = async (req, res) => {
    try{
        let username = req.body.username;
        let usernameLoginNow = req.body.usernameLoginNow;
        let password = req.body.password;
        var admin = await db.Admin.findOne({
            where: {
                username: usernameLoginNow,
                password: await lib.passwordHash(password)
            }
        });
        if(admin){
            db.AdminPermissions.destroy({where:{usernameAdmin : username}});
            db.Admin.destroy({where:{username : username}})
            .then(num => {
                if (num == 1) {
                    res.send({message: "Successful"});
                } else {
                res.send({ message: `Cannot update Tutorial with id=${username}. Maybe Tutorial was not found or req.body is empty!`});
                }
            });
        }
    }catch(err){
        res.status(500).send({message: "Error", err});
    }
}