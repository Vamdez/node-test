const Sequelize = require("sequelize")

const sequelize = new Sequelize('base_de_dados', 'usuario', 'senha', {
    host: 'localhost',
    port: 3307,
    dialect: 'mysql',
    define:{
        timestamp: true
    },
    timezone: "-03:00"
});


sequelize.authenticate()
.then(function(){
    console.log("Sucesso na Conexão com banco de dados")
}).catch(function(){
    console.log("Erro na Conexão com banco de dados")
})


module.exports = sequelize