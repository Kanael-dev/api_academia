const dot = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

mongoose.set("strictQuery", false);

app.use(cors());

 
// Variveis de ambiente
const userNameMongo = process.env.USER_NAME;
const userPasswordMongo = process.env.USER_PASSWORD;

//Configuração para ler o JSON //
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());
app.use(cookieParser());
// Validador

const router = express.Router();


//Rotas api //
const userRouter = require("./backend/router/router_usuarios");
const userPlanos = require("./backend/router/router_planos");
const userExercicios = require("./backend/router/router_exercicios");
//const auth = require("./backend/router/recurso-protegido");


app.use("/usuarios", userRouter);
app.use("/planos", userPlanos)
app.use("/exercicios", userExercicios)
//app.use("/auth", auth)
//Configuração para ler o JSON //

mongoose.connect(
  `mongodb+srv://${userNameMongo}:${userPasswordMongo}@kanael0.yuazcu9.mongodb.net/`
)
.then(() => {
  console.log("Conectado com sucesso");
  app.listen(3001);
})
.catch((err) => console.log(err));
