'use strict';

const { Sequelize, DataTypes } = require("sequelize");
const AdminModel = require('./Admin');
const ConfigModel = require('./Config');

require("dotenv").config();

const sequelize = new Sequelize(process.env.MYSQL_DB, process.env.MYSQ_USER,process.env.MYSQ_PASS , {
	host: process.env.MYSQL_HOST,
	port: process.env.MYSQL_PORT,
	dialect: 'mysql',
	logging: false,
});

const Admin = AdminModel(sequelize, DataTypes);
const Config = ConfigModel(sequelize, DataTypes);

sequelize.authenticate()
    .then(() => console.log('ket noi thanh cong'))

module.exports = {
    Admin,
	Config,
    sequelize
};
