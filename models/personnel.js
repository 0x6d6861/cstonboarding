const bcrypt = require('bcryptjs');

'use strict';
module.exports = (sequelize, DataTypes) => {
    const Personnel = sequelize.define('Personnel', {
        personnel_id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        personnel_onames: {type: DataTypes.STRING, validate: {max: 45}},
        personnel_fname: {type: DataTypes.STRING, validate: {max: 20}},
        personnel_email: {type: DataTypes.STRING, validate: {max: 45}},
        personnel_phone: {type: DataTypes.STRING, validate: {max: 45}},
        personnel_password: {
          type: DataTypes.STRING, default: 'e10adc3949ba59abbe56e057f20f883e',
          /*set: function (val) {
                this.setDataValue('title', val.toUpperCase());
            }, */ // bcrypt stuff
          validate: {max: 100}
        },
        personnel_status: {type: DataTypes.INTEGER, validate: {isInt: true, isIn: [[0, 1]]}},
        last_login: DataTypes.DATE,
        personnel_type_id: {type: DataTypes.INTEGER, default: 1, validate: {isInt: true}},
        reset_password: {type: DataTypes.INTEGER, default: 1, validate: {isInt: true}},
    }, {
        timestamps: false,
        tableName: 'personnel'
    });

    Personnel.associate = function (models) {
        // associations can be defined here
        Personnel.hasMany(models.Task, {
            foreignKey: 'personnel_id'
        })
    };

  Personnel.prototype.validPassword = function(password) {
    return bcrypt.compare(password, this.personnel_password);
  };

    return Personnel;
};
