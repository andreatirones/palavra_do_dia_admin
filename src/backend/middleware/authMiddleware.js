const jwt = require('jsonwebtoken');
const User = require('../../database/models/User');

// Middleware para proteger rotas
const authMiddleware = async (req, res, next) => {
  try {
    let token;
    
    // Verificar se o token está no header Authorization
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      // Extrair token do header
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies && req.cookies.token) {
      // Ou verificar se está nos cookies
      token = req.cookies.token;
    }
    
    // Verificar se o token existe
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Acesso não autorizado. Faça login para continuar.'
      });
    }
    
    // Verificar token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Buscar usuário pelo ID
    const user = await User.findById(decoded.id);
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Usuário não encontrado.'
      });
    }
    
    // Adicionar usuário à requisição
    req.user = user;
    
    next();
  } catch (error) {
    console.error('Erro no middleware de autenticação:', error.message);
    
    return res.status(401).json({
      success: false,
      message: 'Acesso não autorizado. Faça login para continuar.'
    });
  }
};

module.exports = authMiddleware;
