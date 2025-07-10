import express from 'express';
import UsuarioController from '../controllers/usuarioController.js';
import upload from '../middleware/upload.js';

const router = express.Router();

router.get('/usuario', UsuarioController.listarTodos);
router.get('/usuario/:id', UsuarioController.buscarPorId);
router.post('/usuario', UsuarioController.criar);
router.put('/usuario/:id', UsuarioController.atualizar);
router.delete('/usuario/:id', UsuarioController.deletar);
router.post('/login', UsuarioController.login);
router.post('/usuario/:id/foto', upload.single('foto'), UsuarioController.uploadFoto);

export default router; 