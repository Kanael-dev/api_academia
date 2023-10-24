const router = require("express").Router();
const Exerciciosconcluidos = require("../models/Exerciciosconcluidos");
const verificarToken = require('../middlwares/authMiddleware.js');
const jwt = require('jsonwebtoken');




// router.get("/exercicios/:id_plano", async (req, res) => {
//   const id = req.params.id_plano;

//   try {
//     const exercicios = await Exercicios.find({ id_plano: id });

//     return res.status(200).json(exercicios);
//   } catch (error) {
//     res.status(500).json({ error: error });
//   }
// });



// Microserviço post
router.post("/", async (req, res) => {
  const { id_plano, nome_exercicio, data_conclusao  } = req.body;

  // Verifique se o campo nome_usuario não está vazio
  if (!id_plano) {
    return res.status(422).json({ error: "Algum erro aconteceu" });
  }

  // Adicione validações adicionais para email_usuario e telefone, se necessário.

  const novoExercicioconcluido = {
    id_plano,
    nome_exercicio,
    data_conclusao
  };

  // Tente criar o usuário na base
  try {
    const novoExercicioAtualizado = await Exerciciosconcluidos.create(novoExercicioconcluido);
    return res.status(201).json({ message: "Parabéns continue assim!"});
  } catch (error) {
    console.error(error); // Registre o erro para depuração
    return res.status(500).json({ error: "Ocorreu um erro." });
  }
});

// Rota para exclusão de um exercício concluído
router.delete("/:exercicioId", async (req, res) => {
  const exercicioId = req.params.exercicioId;

  try {
    const exercicio = await Exerciciosconcluidos.findByPk(exercicioId);

    if (!exercicio) {
      return res.status(404).json({ error: "Exercício não encontrado." });
    }

    await exercicio.destroy(); // Realiza a exclusão do exercício

    return res.status(204).send(); // Retorna uma resposta vazia para indicar sucesso na exclusão
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Ocorreu um erro durante a exclusão do exercício." });
  }
});

module.exports = router;