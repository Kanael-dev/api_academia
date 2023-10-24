const jwt = require('jsonwebtoken');
const scrtk = process.env.SECRET_KEY_JWT;

// Middleware para verificar o token JWT
function verificarToken(req, res, next) {
  const token = req.cookies.token;

  if (token) {
    jwt.verify(token, scrtk, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Token inválido' });
      } else {
        req.user = decoded;
        next();
      }
    });
  } else {
    return res.status(401).json({ message: 'Token ausente' });
  }
}

module.exports = verificarToken;
