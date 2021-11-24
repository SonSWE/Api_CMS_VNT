'use strict';

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Permissions',{
        id: {
            type: DataTypes.INTEGER(11),
            primaryKey: true
        },
        key:{
            type:DataTypes.STRING,
            allowNull: false
        }
    },
    {
        tableName:"permissions",
        createdAt: false,
        updatedAt: false
    });
};
