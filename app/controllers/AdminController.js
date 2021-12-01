'use strict';

const { Sequelize, DataTypes } = require("sequelize");
const Op = Sequelize.Op;
const db = require('../models/index');
const lib =  new require('../lib/lib');

exports.Create =  async (req, res) => {
    try{
        // create a new admin
        var admin = {
            username: req.body.username,
            password: await lib.passwordHash(req.body.password),
            permissions: req.body.permissions,
            create: parseInt(req.body.create),
            modify: parseInt(req.body.update),
            delete: parseInt(req.body.delete)
        }
        console.log(admin)
        // save admin to database
        db.Admin.create(admin)
        .then(data => {
            res.send({message: "Successful"});
        });
    }catch(err){
        res.status(500).send({message: "Error",err});
    }
}

exports.UpdatePermissions = async (req, res) => {
    try{
        const username = req.body.username;
        db.Admin.update(
            {create: req.body.create, update: req.body.update, delete: req.body.delete}, 
            {where:{username : username}
        })
        .then(num => {
            if (num == 1) {
                res.send({message: "Successful"});
            } else {
              res.send({ message: `Cannot update Tutorial with id=${username}. Maybe Tutorial was not found or req.body is empty!`});
            }
        });
    }catch(err){
        res.status(500).send({message: "Error", err});
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

exports.GetListAdmin = async (req, res) => {
    try{
        var listCofig = await db.Admin.findAll({attributes: ['username', 'permissions', 'create', 'update', 'delete']})
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
        var listCofig = await db.Admin.findAll({where: {username: {[Op.regexp]: `(${username})`}}})
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