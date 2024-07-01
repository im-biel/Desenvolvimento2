import express from 'express';
import dotenv from 'dotenv';
import mysql from 'mysql2';

dotenv.config({ path: './.env' });

const app = express();
const PORT = process.env.PORT || 3000;

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados MySQL:', err);
    throw err;
  }
  console.log('Conexão bem-sucedida com o banco de dados MySQL');
});

app.use(express.json());

// ROTAS

// POST = Criar usuário
app.post('/api/user/payment', (req, res) => {
  const { name , plan } = req.body;
  const validPlans = ['basic', 'premium', 'ultimate'];

  if (!validPlans.includes(plan)) {
    return res.status(400).json({ error: 'Invalid plan name' });
  }

  const sql = 'INSERT INTO user (name, plan) VALUES (?, ?)';
  db.query(sql, [name, plan], (err, result) => {
    if (err) {
      console.error('Erro ao inserir usuário:', err);
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: result.insertId, name, plan });
  });
});

// GET = Listar usuários
app.get('/usuarios', (req, res) => {
  const sql = 'SELECT * FROM user';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Erro ao listar usuários:', err);
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(results);
  });
});

// PUT = Atualizar usuário
app.put('/usuarios/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const sql = 'UPDATE user SET name = ? WHERE id = ?';
  db.query(sql, [name, id], (err, result) => {
    if (err) {
      console.error('Erro ao atualizar usuário:', err);
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ id, name });
  });
});

// DELETE = Deletar usuário
app.delete('/usuarios/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM user WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Erro ao deletar usuário:', err);
      return res.status(500).json({ error: err.message });
    }
    res.status(204).send();
  });
});

// SERVIDOR
app.listen(PORT, () => {
  console.log(`O servidor está rodando em http://localhost:${PORT}`);
});
