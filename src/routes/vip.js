// routes/vip.js

const express = require('express');
const router = express.Router();
const VipUser = require('../models/User'); // Importe o modelo de usuário VIP

// Rota para registrar um usuário VIP
router.post('/register', async (req, res) => {
  const { discordNick, plan } = req.body; // Recebe o nick do Discord e o plano escolhido do corpo da requisição

  try {
    // Cria um novo usuário VIP no banco de dados
    const newUser = new VipUser({
      discordNick,
      plan
    });

    // Salva o usuário no banco de dados
    const savedUser = await newUser.save();

    res.status(201).json(savedUser); // Retorna o usuário criado como resposta
  } catch (error) {
    res.status(500).json({ message: error.message }); // Retorna um erro caso ocorra algum problema
  }
});

module.exports = router;
