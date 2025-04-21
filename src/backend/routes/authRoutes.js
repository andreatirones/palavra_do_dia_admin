const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

// Rotas públicas
router.post('/login', authController.login);

// Rotas protegidas (requerem autenticação)
router.use(authMiddleware);
router.get('/me', authController.getMe);
router.put('/profile', authController.updateProfile);
router.put('/password', authController.changePassword);

module.exports = router;
