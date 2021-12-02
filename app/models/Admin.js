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
          idPermissions:{
            type:DataTypes.STRING,
            allowNull: false,
            field: 'id_permissions'
        }
},
    {
        tableName:"admin",
        createdAt: false,
        updatedAt: false
    });
};
