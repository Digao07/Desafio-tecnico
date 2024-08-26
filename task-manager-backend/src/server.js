require('dotenv').config();
const express = require('express');
const sequelize = require('./config/database');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);


sequelize.authenticate()
  .then(() => console.log('Conectado ao banco de dados'))
  .catch(err => console.log('Erro ao conectar ao banco de dados', err));

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
