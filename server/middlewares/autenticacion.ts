import { NextFunction, Request, Response } from "express";
const jwt = require('jsonwebtoken');


export const TokenValidation = ( req: any, res: Response, next: NextFunction ) => {

    const token = req.header('x-token');

    if(!token) return res.status(401).json('Acceso denegado');

    const payload = jwt.verify(token, 'secret');
    //console.log(payload.user);
    req.userId = payload.user.iduser;

    next();
}