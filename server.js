const express = require('express') //importa express
const app = express(); //cria instância do express

//conecta ao MongoDB com mongoose
const db = require('./src/data/database');
db.connect();

//possibilita trabalhar com JSON
app.use(express.json());

//rotas
const estudioRouter = require('./src/routes/estudioRoutes');
const tituloRouter = require('./src/routes/tituloRoutes');

app.use('/estudios', estudioRouter);
app.use('/titulos', tituloRouter);

app.listen(3333, () => console.log('Servidor rodando!'));