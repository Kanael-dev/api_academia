const mongoose = require('mongoose')

const Usuarios = mongoose.model('Usuarios', {
    nome_usuario: String,
    email_usuario: String,
    senha_usuario: String,
    telefone: String
})

module.exports = Usuarios