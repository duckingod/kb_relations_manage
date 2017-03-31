"use strict";

module.exports = function(sequelize, DataTypes) {
    var stringValidate = { notEmpty:true };
    var kbtriple = sequelize.define("kbtriple", {
        headEntity: { type:DataTypes.STRING, validate: stringValidate } ,
        relation: { type:DataTypes.STRING, validate: stringValidate } ,
        tailEntity: { type:DataTypes.STRING, validate: stringValidate } ,
        symmetric:{  type:DataTypes.BOOLEAN, allowNull:false, default:false },
        temporal:{  type:DataTypes.BOOLEAN, allowNull:false, default:false }
    }, {});
    return kbtriple;
};
