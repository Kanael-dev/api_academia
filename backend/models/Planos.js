const mongoose = require('mongoose')

const Planos = mongoose.model('Planos', {
    id_usuario: String,
    nome_plano: String,
    status: Number
})

module.exports = Planos