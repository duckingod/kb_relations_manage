"use strict";

module.exports = function(sequelize, DataTypes) {
    var kbtriple= sequelize.define("kbtriple", {
        first: DataTypes.STRING,
        relation: DataTypes.STRING,
        second: DataTypes.STRING,
        symmetric: DataTypes.BOOLEAN
    }, {});
    return kbtriple;
};
