const express = require('express');
const sequelize = require('./config/database');
const cors = require('cors');
const dotenv = require('dotenv');
const fs = require('fs');
const https = require('https');
const helmet = require('helmet');
const authRoutes = require('./routes/authRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

// Configuração HTTPS
const options = {
    key: fs.readFileSync('certs/privkey.pem'),
    cert: fs.readFileSync('certs/fullchain.pem')
};

sequelize.sync()
    .then(() => {
        https.createServer(options, app).listen(PORT, () => {
            console.log(`Server running on https://localhost:${PORT}`);
        });
    })
    .catch(err => console.log(err));
