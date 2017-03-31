"use strict";

module.exports = function(sequelize, DataTypes) {
    var kbtriple= sequelize.define("kbtriple", {
        headEntity: { type:DataTypes.STRING, allowNull:false } ,
        relation: { type:DataTypes.STRING, allowNull:false } ,
        tailEntity: { type:DataTypes.STRING, allowNull:false } ,
        symmetric:{  type:DataTypes.BOOLEAN, allowNull:false, default:false },
        temporal:{  type:DataTypes.BOOLEAN, allowNull:false, default:false }
    }, {});
    return kbtriple;
};
