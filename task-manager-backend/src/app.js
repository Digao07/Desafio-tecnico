const express = require('express');
const sequelize = require('./config/database');
const app = express();

app.use(express.json());

// Testando a conexão com o banco de dados
sequelize.authenticate()
  .then(() => console.log('Conectado ao banco de dados'))
  .catch(err => console.log('Erro ao conectar ao banco de dados', err));

module.exports = app;
