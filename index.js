const dot = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

mongoose.set("strictQuery", false);

app.use(cors());

// Variáveis de ambiente
const userNameMongo = process.env.USER_NAME;
const userPasswordMongo = process.env.USER_PASSWORD;
const dbName = 'aplicacao'; // Nome do banco de dados

// Configuração para ler o JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Rotas api
const userRouter = require("./backend/router/router_usuarios");
const userPlanos = require("./backend/router/router_planos");
const userExercicios = require("./backend/router/router_exercicios");

app.use("/usuarios", userRouter);
app.use("/planos", userPlanos)
app.use("/exercicios", userExercicios)

// Configuração para ler o JSON

mongoose.connect(`mongodb+srv://${userNameMongo}:${userPasswordMongo}@kanael0.yuazcu9.mongodb.net/${dbName}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("Conectado com sucesso");
  app.listen(3001);
})
.catch((err) => console.log(err));

//
