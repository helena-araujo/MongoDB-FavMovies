const mongoose = require('mongoose'); //importando mongoose

//cria o esqueleto
const tituloSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  //nome do titulo
  nome: {
    type: String,
    required: true
  },
  //gênero do titulo
  genero: {
    type: String,
    required: true
  },
  //descrição do filme
  descricao: {
    type: String,
    required: true
  },
  //estudio do título, faz referência ao estudioSchema
  estudio: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'estudio'
  },
  //data de criação
  criadoEm: {
    type: Date,
    required: true,
    default: new Date
  }
});

//exporta o schema
module.exports = mongoose.model('titulo', tituloSchema);