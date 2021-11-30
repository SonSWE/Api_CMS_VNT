'use strict';

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Admin',{
          username:{
            type:DataTypes.STRING,
            primaryKey: true
          },
          password: {
            type: DataTypes.STRING,
            allowNull: false
          },
          permissions: {
            type: DataTypes.STRING,
            allowNull: false
          },
          create: {
            type: DataTypes.INTEGER(1),
            allowNull: false
          },
          modify: {
            type: DataTypes.INTEGER(1),
            allowNull: false,
            field: 'update'
          },
          delete: {
            type: DataTypes.INTEGER(1),
            allowNull: false
          },
          
    },
    {
        tableName:"admin",
        createdAt: false,
        updatedAt: false
    });
};
