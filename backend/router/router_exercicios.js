const router = require("express").Router();
const Exercicios = require("../models/Exercicios.js");
const verificarToken = require('../middlwares/authMiddleware.js');
const jwt = require('jsonwebtoken');


//Rota padrão todos os exercicios
router.get("/", async (req, res) => {

  try {
    const exercicios = await Exercicios.find();

    return res.status(200).json(exercicios);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

//Exercicios pela ID
router.get("/exercicios/:id_plano", async (req, res) => {
  const id = req.params.id_plano;

  try {
    const exercicios = await Exercicios.find({ id_plano: id });

    return res.status(200).json(exercicios);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});



// Microserviço post
router.post("/", async (req, res) => {
  const { id_plano, nome_exercicio  } = req.body;

  // Verifica se foi preenchido o nome do exercicio
  if (!nome_exercicio) {
    return res.status(422).json({ error: "Nome do exercicio não inserido" });
  }

  const novoExercicio = {
    id_plano,
    nome_exercicio
  };

  //Tenta cria o exercicio na base
  try {
    const novoExercicioadastrado = await Exercicios.create(novoExercicio);
    return res.status(201).json({ message: "Exercicio criado com sucesso!"});
  } catch (error) {
    console.error(error); // Caso falhe
    return res.status(500).json({ error: "Ocorreu um erro ao registrar o plano." });
  }
});

module.exports = router;