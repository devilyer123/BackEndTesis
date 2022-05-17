import { Request, Response } from "express";
import Usuario from "../models/usuario.model";
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

export default class UserController {
    createUser = async (req: Request, res: Response) => {
        let password = bcrypt.hashSync(req.body.password, 10);
        const { priNombre, secNombre, apPaterno, apMaterno, nrocelular, rolUser, username, email } = req.body;
        try {
            let user = await Usuario.findOne({
                where: {
                    username: username
                }
            });
            if (user) {
                res./*status(404).*/json({ok: false, message: "Este nombre de usuario ya esta siendo utilizado"});
            } else {
                let newUser = await Usuario.create({
                    priNombre: priNombre,
                    secNombre: secNombre,
                    apPaterno: apPaterno,
                    apMaterno: apMaterno,
                    nrocelular: nrocelular,
                    rolUser: rolUser,
                    username: username,
                    email: email,
                    password: password
                });
                if (newUser) {

                    let token = jwt.sign({ newUser: newUser }, "secret");
    
                    return res.json({
                        ok: true,
                        message: 'Usuario creado satisfactoriamente',
                        dataUsers: newUser,
                        token: token
                    });
                }
            }   
        } catch (e) {
            console.log(e);
            res.status(500).json({
                ok: false,
                message: 'Ha ocurrido un error inesperado',
                dataUsers: {}
            });
        }
    }

    getUsers = async (req: Request, res: Response) => {
        try {
            const users = await Usuario.findAll({
                order: [
                    ['username', 'ASC']
                ]
            });
            res.json({
                dataUsers: users
            });
        } catch (e) {
            console.log(e);
        }
    }

    getOneUser = async (req: Request, res: Response) => {
        const { id } = req.params;
        const user = await Usuario.findOne({
            where: {
                iduser: id
            }
        })
        res.json(user);
    }

    deleteUser = async (req: Request, res: Response) => {
        const { id } = req.params;
        const deleteRowCount = await Usuario.destroy({
            where: {
                iduser: id
            }
        });
        res.json({
            message: 'Usuario eliminado satisfactoriamente',
            count: deleteRowCount
        });
    }

    updateUser = async (req: Request, res: Response) => {
        const { id } = req.params;
        const { priNombre, secNombre, apPaterno, apMaterno, nrocelular, rolUser, username, email/*, password*/ } = req.body;

        const users = await Usuario.findAll({
            attributes: [ 'iduser', 'priNombre', 'secNombre', 'apPaterno', 'apMaterno', 'nrocelular', 'rolUser', 'username', 'email'/*, 'password'*/ ],
            where: {
                iduser: id
            }
        });

        if(users.length > 0) {
            users.forEach(async user => {
                await user.update({
                    priNombre: priNombre,
                    secNombre: secNombre,
                    apPaterno: apPaterno,
                    apMaterno: apMaterno,
                    nrocelular: nrocelular,
                    rolUser:rolUser,
                    username: username,
                    email: email,
                    //password: bcrypt.hashSync(password, 10)
                });
            })
        }

        return res.json({
            message: 'Usuario actualizado satisfactoriamente',
            dataUsers: users
        })
    }

    loginUser = async (req: Request, res: Response) => {
        const { username, password } = req.body;
        try{
            let user = await Usuario.findOne({
                where: {
                    username: username
                }
            });
            if (!user) {
                res./*status(404).*/json({ok: false, message: "Usuario con este nombre no encontrado"});
            } else {
                if (bcrypt.compareSync(password, user.password)) {
                    
                    let token = jwt.sign({ user: user }, "secret");
                    return res.header('x-token', token).json({
                        user: user,
                        ok: true,
                        token: token
                    })
                } else {
                    return res./*status(401).*/json({ok: false, message: "Contraseña Incorrecta" })
                }
            }
        } catch (e) {
            res.status(500).json({
                ok: false,
                message: 'Usuario/constraseña no son correctos',
            });
        }
    }

    profile = async (req: Request, res: Response) => {
        const user = await Usuario.findOne({where: { iduser: req.userId }})
        if (!user) {return res.status(404).json('No se encontro este usuario')};
        res.json(user);
        /*res.json({
            ok: true,
            user
        });*/
    }

}
