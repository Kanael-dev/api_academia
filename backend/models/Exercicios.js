const mongoose = require('mongoose')

const Exercicios = mongoose.model('Exercicios', {
    id_plano: String,
    nome_exercicio: String
})

module.exports = Exercicios