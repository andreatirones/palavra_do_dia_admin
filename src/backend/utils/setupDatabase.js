const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../../database/models/User');
const Setting = require('../../database/models/Setting');

// Função para configurar o banco de dados com valores padrão
const setupDatabase = async () => {
  try {
    console.log('Configurando banco de dados com valores padrão...');
    
    // Verificar se já existe um usuário administrador
    const adminExists = await User.findOne({ role: 'admin' });
    
    if (!adminExists) {
      console.log('Criando usuário administrador padrão...');
      
      // Criar hash da senha
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('admin123', salt);
      
      // Criar usuário administrador
      const admin = new User({
        name: 'Administrador',
        email: 'admin@palavradodia.com',
        password: hashedPassword,
        role: 'admin'
      });
      
      await admin.save();
      console.log('Usuário administrador criado com sucesso!');
    }
    
    // Verificar se já existem configurações
    const settingsExist = await Setting.findOne({});
    
    if (!settingsExist) {
      console.log('Criando configurações padrão...');
      
      // Criar configurações padrão
      const settings = new Setting({
        site: {
          title: {
            pt: 'Palavra do Dia',
            en: 'Word of the Day'
          },
          description: {
            pt: 'Uma palavra diária para reflexão e inspiração',
            en: 'A daily word for reflection and inspiration'
          }
        },
        imageGeneration: {
          defaultWordBackground: '#172d4d',
          defaultWordTextColor: '#daa520',
          defaultReflectionBackground: '#daa520',
          defaultReflectionTextColor: '#ffffff',
          defaultFontFamily: 'serif',
          defaultFontSize: 36,
          defaultWidth: 1080,
          defaultHeight: 1080
        },
        comments: {
          enabled: true,
          requireModeration: true,
          notifyOnNew: true
        },
        analytics: {
          enabled: true,
          trackCountry: true,
          trackDevice: true,
          trackTimeSpent: true
        }
      });
      
      await settings.save();
      console.log('Configurações padrão criadas com sucesso!');
    }
    
    console.log('Configuração do banco de dados concluída!');
    return true;
  } catch (error) {
    console.error('Erro ao configurar banco de dados:', error.message);
    return false;
  }
};

// Exportar função
module.exports = setupDatabase;
