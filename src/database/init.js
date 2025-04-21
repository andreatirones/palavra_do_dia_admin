const mongoose = require('mongoose');

// Função para inicializar o banco de dados
const initDatabase = async () => {
  try {
    // Conectar ao MongoDB
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    
    console.log(`MongoDB conectado: ${conn.connection.host}`);
    
    return true;
  } catch (error) {
    console.error(`Erro ao conectar ao MongoDB: ${error.message}`);
    return false;
  }
};

module.exports = initDatabase;
