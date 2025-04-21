const User = require('../../database/models/User');

// Login de usuário
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Validar campos
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email e senha são obrigatórios'
      });
    }
    
    // Verificar se o usuário existe
    const user = await User.findOne({ email }).select('+password');
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Credenciais inválidas'
      });
    }
    
    // Verificar se a senha está correta
    const isMatch = await user.matchPassword(password);
    
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Credenciais inválidas'
      });
    }
    
    // Gerar token JWT
    const token = user.getSignedJwtToken();
    
    // Remover senha do objeto de resposta
    user.password = undefined;
    
    res.status(200).json({
      success: true,
      token,
      data: user
    });
  } catch (error) {
    console.error('Erro ao fazer login:', error.message);
    res.status(500).json({
      success: false,
      message: 'Erro ao fazer login: ' + error.message
    });
  }
};

// Obter usuário atual
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Erro ao obter usuário:', error.message);
    res.status(500).json({
      success: false,
      message: 'Erro ao obter usuário: ' + error.message
    });
  }
};

// Atualizar perfil
exports.updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;
    
    // Validar campos
    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: 'Nome e email são obrigatórios'
      });
    }
    
    // Atualizar usuário
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { name, email },
      { new: true, runValidators: true }
    );
    
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Erro ao atualizar perfil:', error.message);
    res.status(500).json({
      success: false,
      message: 'Erro ao atualizar perfil: ' + error.message
    });
  }
};

// Alterar senha
exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    
    // Validar campos
    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Senha atual e nova senha são obrigatórias'
      });
    }
    
    // Verificar se a nova senha tem pelo menos 6 caracteres
    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Nova senha deve ter pelo menos 6 caracteres'
      });
    }
    
    // Buscar usuário com senha
    const user = await User.findById(req.user.id).select('+password');
    
    // Verificar se a senha atual está correta
    const isMatch = await user.matchPassword(currentPassword);
    
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Senha atual incorreta'
      });
    }
    
    // Atualizar senha
    user.password = newPassword;
    await user.save();
    
    res.status(200).json({
      success: true,
      message: 'Senha alterada com sucesso'
    });
  } catch (error) {
    console.error('Erro ao alterar senha:', error.message);
    res.status(500).json({
      success: false,
      message: 'Erro ao alterar senha: ' + error.message
    });
  }
};
