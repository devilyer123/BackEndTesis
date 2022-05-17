"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenValidation = void 0;
const jwt = require('jsonwebtoken');
const TokenValidation = (req, res, next) => {
    const token = req.header('x-token');
    if (!token)
        return res.status(401).json('Acceso denegado');
    const payload = jwt.verify(token, 'secret');
    //console.log(payload.user);
    req.userId = payload.user.iduser;
    next();
};
exports.TokenValidation = TokenValidation;
//# sourceMappingURL=autenticacion.js.map