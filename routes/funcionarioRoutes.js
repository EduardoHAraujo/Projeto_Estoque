const express = require('express');
const router = express.Router();
const funcionarioController = require('../controllers/funcionarioController');

router.get('/', funcionarioController.listarFuncionarios);
router.post('/', funcionarioController.criarFuncionario);
router.get('/:id', funcionarioController.mostrarFuncionario);
router.put('/:id', funcionarioController.atualizarFuncionario);
router.delete('/:id', funcionarioController.excluirFuncionario);

module.exports = router;