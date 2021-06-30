const mongoose = require('mongoose');
const Estudio = require('../models/estudio');

const criaEstudio = async (req, res) => {

  const estudio = new Estudio({
    _id: new mongoose.Schema.Types.ObjectId(),
    nome: req.body.nome,
    criadoEm: req.body.criadoEm
  });

  const estudioExiste = await Estudio.findOne({ nome: req.body.nome });
  if (estudioExiste) {
    return res.status(409).json({
      error: "Estudio já está cadastrado!"
    });
  }

  try {
    const novoEstudio = await estudio.save();
    res.status(201).json(novoEstudio);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

const listaEstudios = async (req, res) => {

  try {
    const estudios = await Estudio.find();
    return res.status(200).json(estudios);
  } catch (err) {
    return res.status(500).json({
      message: err.message
    });
  }
}

//testar
const atualizaEstudio = async (req, res) => {

  try {
    const estudio = await Estudio.findById(req.params.id);
    if (estudio == null) {
      return res.status(404).json({
        message: 'Estudio não encontrado!'
      });
    }

    const { nome, criadoEm } = req.body;

    if (nome != null
      || nome != undefined) {
      estudio.nome = nome;
    }

    if (criadoEm != null
      || criadoEm != undefined) {
      estudio.criadoEm = criadoEm;
    }

    const estudioAtualizado = await estudio.estudio();
    res.json(estudioAtualizado);

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
}

const deletaEstudio = async (req, res) => {
  
  try {
    const estudio = await Estudio.findById(req.params.id);
    if (estudio == null) {
      return res.status(404).json({
        message: 'Estudio não encontrado!'
      });
    }

    await estudio.remove();
    res.json({
      message: 'Estudio deletado com sucesso!'
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message
    });
  }
}

module.exports = {
  criaEstudio,
  listaEstudios,
  atualizaEstudio,
  deletaEstudio
}