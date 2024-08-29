require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');
const sequelize = require('./config/database');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuração do CORS
app.use(cors({
  origin: 'http://localhost:3001', // Frontend rodando no localhost:3001
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos HTTP permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // Cabeçalhos permitidos
  credentials: true // Permitir o envio de cookies e outras credenciais
}));

// Middleware para parsing de JSON
app.use(express.json());

// Rotas de autenticação e tarefas
app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);

// Testando a conexão com o banco de dados
sequelize.authenticate()
  .then(() => console.log('Conectado ao banco de dados'))
  .catch(err => console.log('Erro ao conectar ao banco de dados', err));

// Iniciando o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
