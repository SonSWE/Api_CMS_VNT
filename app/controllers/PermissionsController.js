'use strict';

const { Sequelize, DataTypes } = require("sequelize");
const Op = Sequelize.Op;
const db = require('../models/index');

exports.FindAll = async (req, res) => {
    try{
        var listPermissions = await db.Permissions.findAll()
        .then(data => {
            res.send({message: "Successful",ListPermissions: data});
        });
    }catch(err){
        res.status(500).send({message: "Error", err});
    }
}
