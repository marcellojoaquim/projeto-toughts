const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('toughts', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
})

try {
    sequelize.authenticate()
    console.log('Conectado com sucesso!')
} catch (error) {
    console.log(`Erro ${error}`)
}

module.exports = sequelize