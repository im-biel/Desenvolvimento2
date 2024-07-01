import express from 'express';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config({ path: './.env' });

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

const PORT = 3000;

// ROTAS

// POST = Criar
app.post('/usuarios', async (req, res) => {
  try {
    const { name, plan } = req.body;
    const newUser = await prisma.user.create({
      data: {
        name,
        plan
      }
    });

    let paymentPage;
    switch (plan) {
      case 'basic':
        paymentPage = 'pagamentovip.html';
        break;
      case 'premium':
        paymentPage = 'pagamentopremium.html';
        break;
      case 'ultimate':
        paymentPage = 'pagamentoLegend.html';
        break;
      default:
        throw new Error('Plano desconhecido');
    }

    res.status(201).json({ newUser, paymentPage });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET = Listar
app.get('/usuarios', async (req, res) => {
  try {
    const { id } = req.query;

    if (id) {
      const user = await prisma.user.findUnique({
        where: {
          id: parseInt(id)
        }
      });

      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }

      return res.status(200).json(user);
    } else {
      const users = await prisma.user.findMany();
      return res.status(200).json(users);
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// PUT = Atualizar
app.put('/usuarios/:id', async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;

    const updatedUser = await prisma.user.update({
      where: {
        id: parseInt(id)
      },
      data: {
        name
      }
    });

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE = Deletar
app.delete('/usuarios/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.user.delete({
      where: {
        id: parseInt(id)
      }
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// SERVIDOR
app.listen(PORT, () => {
  console.log(`O servidor está rodando em http://localhost:${PORT}`);
});

// Comando prisma
// npx prisma studio
