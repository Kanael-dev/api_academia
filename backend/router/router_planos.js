const router = require("express").Router();
const Planos = require("../models/Planos.js");
const verificarToken = require('../middlwares/authMiddleware.js');
const jwt = require('jsonwebtoken');


router.get("/", async (req, res) => {

  try {
    const planos = await Planos.find();

    return res.status(200).json(planos);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});


router.get("/planosusuario/:id_usuario", async (req, res) => {
  const id = req.params.id_usuario;

  try {
    const planos = await Planos.find({ id_usuario: id });

    return res.status(200).json(planos);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});



// Microserviço post
router.post("/", async (req, res) => {
  const { id_usuario, nome_plano  } = req.body;

  // Verifique se o campo nome_usuario não está vazio
  if (!nome_plano) {
    return res.status(422).json({ error: "O campo nome do plano é obrigatorio!" });
  }

  // Adicione validações adicionais para email_usuario e telefone, se necessário.

  const novoPlano = {
    id_usuario,
    nome_plano,
    status: 1
  };

  // Tente criar o usuário na base
  try {
    const novoPlanoCadastrado = await Planos.create(novoPlano);
    return res.status(201).json({ message: "Criado com sucesso!"});
  } catch (error) {
    console.error(error); // Registre o erro para depuração
    return res.status(500).json({ error: "Ocorreu um erro ao registrar o plano." });
  }
});

module.exports = router;