
const Sequelize = require("sequelize");
const db = require("./db")
const Site = db.define(
    'sites',
    {
        name:{
            type: Sequelize.STRING,
            allowNull: false
        },
        url:{
            type: Sequelize.STRING,
            allowNull:false
        }

})
//criar tabela
//Site.sync();
module.exports = Site;