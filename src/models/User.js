// models/VipUser.js

const mongoose = require('mongoose');

// Definição do schema para um usuário VIP
const vipUserSchema = new mongoose.Schema({
  discordNick: { type: String, required: true },
  plan: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

// Criação do modelo VipUser baseado no schema
const VipUser = mongoose.model('VipUser', vipUserSchema);

module.exports = VipUser;

