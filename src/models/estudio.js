const mongoose = require('mongoose'); //importando mongoose

//cria o esqueleto
const estudioSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  //nome do estúdio
  nome: {
    type: String,
    required: true
  },
  //data de criação
  criadoEm: {
    type: Date,
    required: true,
    default: new Date
  }
});

//exporta o schema
module.exports = mongoose.model('estudio', estudioSchema);