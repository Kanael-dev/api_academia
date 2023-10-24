const router = require("express").Router();
const Usuarios = require("../models/Usuarios.js");
const verificarToken = require('../middlwares/authMiddleware.js');
const jwt = require('jsonwebtoken');


//Microserviço get
router.get("/", async (req, res) => {
    try {
      const usuarios = await Usuarios.find();
  
      return res.status(200).json(usuarios);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  });


// Microserviço post
router.post("/", async (req, res) => {
  const { nome_usuario, email_usuario, senha_usuario, telefone } = req.body;

  // Verifique se o campo nome_usuario não está vazio
  if (!nome_usuario || !email_usuario || !senha_usuario || !telefone) {
    return res.status(422).json({ error: "Possui campos que são obrigatorios" });
  }

  // Adicione validações adicionais para email_usuario e telefone, se necessário.

  const dadosUsuarios = {
    nome_usuario,
    email_usuario,
    senha_usuario,
    telefone
  };

  // Tente criar o usuário na base
  try {
    const novoUsuario = await Usuarios.create(dadosUsuarios);
    return res.status(201).json({ message: "Usuário registrado com sucesso!", usuario: novoUsuario });
  } catch (error) {
    console.error(error); // Registre o erro para depuração
    return res.status(500).json({ error: "Ocorreu um erro ao registrar o usuário." });
  }
});

module.exports = router;