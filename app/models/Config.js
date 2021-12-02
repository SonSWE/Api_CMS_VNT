'use strict';

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Config',{
        id: {
            type: DataTypes.INTEGER(11),
            primaryKey: true
        },
        key:{
            type:DataTypes.STRING,
            allowNull: false
        },
        appId: {
            type: DataTypes.STRING,
            allowNull: false
        },
        value: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        type: {
            type: DataTypes.INTEGER(1),
            allowNull: false
        },
        updateTime: { 
            type: 'TIMESTAMP' , 
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
            field: 'update_time'
        },
        configVersion: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'config_version'
        },
    },
    {
        tableName:"config",
        createdAt: false,
        updatedAt: false
    });
};
