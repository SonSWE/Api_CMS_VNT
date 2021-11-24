'use strict';

const { Sequelize, DataTypes } = require("sequelize");
const Op = Sequelize.Op;
const db = require('../models/index');
const lib =  new require('../lib/lib');

exports.Create =  async (req, res) => {
    try{
        // create a new config
        var config = {
            id: parseInt(lib.randomNumber(5)),
            key: req.body.key,
            app_id: req.body.appId,
            value: req.body.value,
            description: req.body.description,
            type: parseInt(req.body.type),
            config_version: req.body.configVersion
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

exports.Update = async (req, res) => {
    try{
        const id = req.body.id;
        console.log(id);
        db.Config.update(req.body, {where:{id : id}})
        .then(num => {
            if (num == 1) {
                res.send({message: "Successful"});
            } else {
              res.send({ message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`});
            }
        });
    }catch(err){
        res.status(500).send({message: "Error", err});
    }
}

exports.GetListConfig = async (req, res) => {
    try{
        db.Config.findAll()
        .then(data => {
            res.send({message: "Successful", data});
        });
    }catch(err){
        res.status(500).send({message: "Error", err});
    }
}

exports.Find = async (req, res) => {
    try{
        const key = req.body.key;
        db.Config.findAll({where: {key: {[Op.regexp]: `(${key})`}}})
        .then(data => {
            res.send({message: "Successful", data});
        });
    }catch(err){
        res.status(500).send({message: "Error", err});
    }
}

exports.Delete = async (req, res) => {
    try{
        const id = req.body.id;
        db.Config.destroy({where:{id : id}})
        .then(num => {
            if (num == 1) {
                res.send({message: "Successful"});
            } else {
              res.send({ message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`});
            }
          })

    }catch(err){
        res.status(500).send({message: "Error", err});
    }
}