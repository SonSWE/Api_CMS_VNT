'use strict';

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('PermissionsDetail',{
        id: {
            type: DataTypes.INTEGER(11),
            primaryKey: true
        },
        idPermissions:{
            type:DataTypes.STRING,
            allowNull: false,
            field: 'id_permissions'
        },
        actionName:{
            type:DataTypes.STRING,
            allowNull: false,
            field: 'action_name'
        },
        actionCode:{
            type:DataTypes.STRING,
            allowNull: false,
            field: 'action_code'
        },
        checkAction: {
            type: DataTypes.INTEGER(1),
            allowNull: false,
            field: 'check_action'
        }
    },
    {
        tableName:"permissions_detail",
        createdAt: false,
        updatedAt: false
    });
};
