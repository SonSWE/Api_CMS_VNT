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
          permissions_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            field: 'permissions_id'
          }
    },
    {
        tableName:"admin",
        createdAt: false,
        updatedAt: false
    });
};
