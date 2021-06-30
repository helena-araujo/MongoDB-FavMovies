const express = require('express');
const router = express.Router();

const controller = require('../controllers/tituloController');

//Create/Criar -> Deverá criar um título
router.post('/marvel', controller.criaTitulo);

//Read/Ler -> Deverá retornar todos os títulos com o estúdio Marvel
router.get('/marvel', controller.listaMarvel);

//Read/Ler -> Deverá retornar todos os títulos com o estúdio Ghibli
router.get('/ghibli', controller.listaGhibli);

//Read/Ler -> Deverá retornar todos os títulos com o estúdio Pixar
router.get('/pixar', controller.listaPixar);

//Read/Ler -> Deverá retornar todos os títulos cadastrados, cada um fazendo referencia ao seu respectivo estúdio
router.get('/', controller.listaTitulos);

//Update/atualizar -> Deverá alterar informação específica dentro de um titulo por id específico e retorna o título alterado
router.patch('/:id', controller.atualizaTitulo)

//Delete/deletar -> DDeverá deletar titulo por id específico e retorna mensagem amigável
router.delete('/:id', controller.deletaTitulo);

module.exports = router;