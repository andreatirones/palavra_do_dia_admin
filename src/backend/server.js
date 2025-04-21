const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const initDatabase = require('../database/init');
const setupDatabase = require('./utils/setupDatabase');

// Carregar variáveis de ambiente
dotenv.config();

// Importar rotas
const authRoutes = require('./routes/authRoutes');
const wordRoutes = require('./routes/wordRoutes');
const commentRoutes = require('./routes/commentRoutes');
const statRoutes = require('./routes/statRoutes');
const settingRoutes = require('./routes/settingRoutes');
const publicRoutes = require('./routes/publicRoutes');
const calendarRoutes = require('./routes/calendarRoutes');

// Inicializar app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, '../../frontend')));
app.use('/uploads', express.static(path.join(__dirname, '../../uploads')));

// Rotas da API
app.use('/api/auth', authRoutes);
app.use('/api/words', wordRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/stats', statRoutes);
app.use('/api/settings', settingRoutes);
app.use('/api/public', publicRoutes);
app.use('/api/calendar', calendarRoutes);

// Rota para o frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/index.html'));
});

// Iniciar servidor
const startServer = async () => {
  try {
    // Conectar ao MongoDB
    const dbConnected = await initDatabase();
    
    if (!dbConnected) {
      console.error('Falha ao conectar ao banco de dados. Encerrando aplicação.');
      process.exit(1);
    }
    
    // Configurar banco de dados com valores padrão
    await setupDatabase();
    
    // Iniciar servidor
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error(`Erro ao iniciar servidor: ${error.message}`);
    process.exit(1);
  }
};

// Iniciar servidor
startServer();

module.exports = app;
