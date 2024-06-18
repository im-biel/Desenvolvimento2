// index.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const vipRoutes = require('./routes/vip'); // Importe suas rotas aqui

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(bodyParser.json());

// Middleware para servir arquivos estáticos
app.use(express.static('public'));

// Configuração das rotas
app.use('/api/vip', vipRoutes); // Todas as rotas de VIP estarão em /api/vip

// Conexão com o banco de dados MongoDB (substitua URL e nome do banco)
mongoose.connect('mongodb://localhost:27017/meu_banco', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Conectado ao MongoDB'))
.catch(err => console.error('Erro de conexão ao MongoDB:', err));

// Inicialização do servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
