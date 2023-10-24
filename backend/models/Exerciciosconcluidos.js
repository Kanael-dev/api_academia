const mongoose = require('mongoose')

const Exerciciosconcluido = mongoose.model('Exerciciosconcluido', {
    id_exercicio: String,
    nome_exercicio: String,
    data_conclusao: Date
})

module.exports = Exerciciosconcluido