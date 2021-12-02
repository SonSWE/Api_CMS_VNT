'use strict';

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('AdminPermissions',{
        id: {
            type: DataTypes.INTEGER(11),
            primaryKey: true
        },
        usernameAdmin:{
            type:DataTypes.STRING,
            allowNull: false,
            field: 'username_admin'
        }
    },
    {
        tableName:"admin_permissions",
        createdAt: false,
        updatedAt: false
    });
};
