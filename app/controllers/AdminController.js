'use strict';

const { Sequelize, DataTypes } = require("sequelize");
const { object } = require("webidl-conversions");
const Op = Sequelize.Op;
const db = require('../models/index');
const lib =  new require('../lib/lib');

exports.Create =  async (req, res) => {
    try{
        // create a new admin
        var admin = { 
            username: req.body.username, 
            password: await lib.passwordHash(req.body.password),
            idPermissions: req.body.idPermissions,
            name: req.body.name
        };
        // save admin to database
        db.Admin.create(admin)
        .then(data => {
            res.send({message: "Successful"});
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

exports.FindAll = async (req, res) => {
    try{
        var result = [];
        var listAdmin = await db.Admin.findAll({attributes: ['username','idPermissions','name']});
        if(listAdmin){
            for(let i = 0;i< listAdmin.length; i++)
            {
                var adminPer = await db.Permissions.findOne({where:{id : listAdmin[i].idPermissions}});
                var admin = {username: listAdmin[i].username,name: listAdmin[i].name, permissions: adminPer.name};
                result.push(admin);
            }
        }
        res.send({data: result});
    }catch(err){
        res.status(500).send({err});
    }
}

exports.FindByUsername = async (req, res) => {
    try{
        var result = [];
        const username = req.body.username;
        var listAdmin = await db.Admin.findAll({where:{username: {[Op.regexp]: `(${username})`}}},{attributes: ['username','idPermissions','name']});
        if(listAdmin){
            for(let i = 0;i< listAdmin.length; i++)
            {
                var adminPer = await db.Permissions.findOne({where:{id : listAdmin[i].idPermissions}});
                var admin = {username: listAdmin[i].username,name: listAdmin[i].name, permissions: adminPer.name};
                result.push(admin);
            }
        }
        res.send({data: result});
    }catch(err){
        res.status(500).send({message: "Error", err});
    }
}

exports.FindByName = async (req, res) => {
    try{
        var result = [];
        const name = req.body.name;
        var listAdmin = await db.Admin.findAll({where:{name: {[Op.regexp]: `(${name})`}}},{attributes: ['username','idPermissions','name']});
        if(listAdmin){
            for(let i = 0;i< listAdmin.length; i++)
            {
                var adminPer = await db.Permissions.findOne({where:{id : listAdmin[i].idPermissions}});
                var admin = {username: listAdmin[i].username,name: listAdmin[i].name, permissions: adminPer.name};
                result.push(admin);
            }
        }
        res.send({data: result});
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
        else{
            res.send({message: "cannot find username or password"});
        }
    }catch(err){
        res.status(500).send({message: "Error", err});
    }
}