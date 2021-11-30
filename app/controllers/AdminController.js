'use strict';

const { Sequelize, DataTypes } = require("sequelize");
const Op = Sequelize.Op;
const db = require('../models/index');
const lib =  new require('../lib/lib');

exports.CreatePermission = async (req, res)=>{
    try{
        var per = {
            id: parseInt(lib.randomNumber(5)),
            key: req.body.key,
            create: req.body.key,
            update: req.body.key,
            delete: req.body.key
        }
        db.Permissions.create(config)
        .then(data => {
            res.send({message: "Successful", data});
        });
    }catch(err){
        res.status(500).send({message: "Error",err});
    }
}

exports.CreateAdmin = async (req, res)=>{
    try{
        // create a new admin
        var config = {
            username: req.body.username,
            password: req.body.password,
            permissions_id: req.body.password
        }
        // save config to database
        db.Config.create(config)
        .then(data => {
            res.send({message: "Successful", data});
        });
    }catch(err){
        res.status(500).send({message: "Error",err});
    }
}
