//[ ] Não deverá ser possível criar título com o mesmo nome
//[ ] Para criar um novo título, deverá vincular no momento da criação a um titulo já existente no sistema
const mongoose = require('mongoose');
const Titulo = require('../models/titulo');

const criaTitulo = async (req, res) => {

  const titulo = new Titulo({
    _id: new mongoose.Schema.Types.ObjectId(),
    nome: req.body.nome,
    genero: req.body.genero,
    descricao: req.body.descricao,
    estudio: req.body.estudio,
    criadoEm: req.body.criadoEm
  });

  const tituloExiste = await Titulo.findOne({ nome: req.body.nome });
  if (tituloExiste) {
    return res.status(409).json({
      error: "Titulo já está cadastrado!"
    });
  }

  try {
    const novoTitulo = await titulo.save();
    res.status(201).json(novoTitulo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

const listaTitulos = async (req, res) => {

  try {
    const titulos = await Titulo.find();
    return res.status(200).json(titulos);
  } catch (err) {
    return res.status(500).json({
      message: err.message
    });
  }
}

const listaTitulosMarvel = async (req, res) => {
  const titulos = await Titulo.find().populate('estudio');
  const titulosFiltrado = titulos.filter(titulo => titulo.estudio.nome == "Marvel");

  return res.status(200).json(titulosFiltrado);
}

const listaTitulosGhibli = async (req, res) => {
  const titulos = await Titulo.find().populate('estudio');
  const titulosFiltrado = titulos.filter(titulo => titulo.estudio.nome == "Ghibli");

  return res.status(200).json(titulosFiltrado);
}

const listaTitulosPixar = async (req, res) => {
  const titulos = await Titulo.find().populate('estudio');
  const titulosFiltrado = titulos.filter(titulo => titulo.estudio.nome == "Pixar");

  return res.status(200).json(titulosFiltrado);
}

//testar
const atualizaTitulo = async (req, res) => {

  try {
    const titulo = await Titulo.findById(req.params.id);
    if (titulo == null) {
      return res.status(404).json({
        message: 'Titulo não encontrado!'
      });
    }

    const { nome, genero, descricao, estudio, criadoEm } = req.body;

    if (nome != null
      || nome != undefined) {
      titulo.nome = nome;
    }

    if (genero != null
      || genero != undefined) {
      titulo.genero = genero;
    }

    if (descricao != null
      || descricao != undefined) {
      titulo.descricao = descricao;
    }

    if (estudio != null
      || estudio != undefined) {
      titulo.estudio = estudio;
    }

    if (criadoEm != null
      || criadoEm != undefined) {
      titulo.criadoEm = criadoEm;
    }

    const tituloAtualizado = await titulo.titulo();
    res.json(tituloAtualizado);

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
}

const deletaTitulo = async (req, res) => {
  try {
    const titulo = await Titulo.findById(req.params.id);
    if (titulo == null) {
      return res.status(404).json({
        message: 'Titulo não encontrado!'
      });
    }

    await titulo.remove();
    res.json({
      message: 'Titulo deletado com sucesso!'
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message
    });
  }
}

module.exports = {
  criaTitulo,
  listaTitulosMarvel,
  listaTitulosGhibli,
  listaTitulosPixar,
  listaTitulos,
  atualizaTitulo,
  deletaTitulo
}