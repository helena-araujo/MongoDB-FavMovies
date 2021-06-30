const express = require('express');
const router = express.Router();

const controller = require('../controllers/estudioController');

//Create/Criar -> Deverá criar um estúdio
router.post('/', controller.criaEstudio);

//Read/Ler -> Deverá retornar todos os estúdios cadastrados
router.get('/', controller.listaEstudios);

//Update/atualizar -> Deverá deletar um estúdio por id específico e retorna mensagem amigável
router.patch('/:id', controller.atualizaEstudio)

//Delete/deletar -> Deverá alterar informação específica dentro de um estúdio por id específico e retorna o título alterado
router.delete('/:id', controller.deletaEstudio);

module.exports = router;