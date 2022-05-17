"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const usuario_model_1 = __importDefault(require("../models/usuario.model"));
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
class UserController {
    constructor() {
        this.createUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let password = bcrypt.hashSync(req.body.password, 10);
            const { priNombre, secNombre, apPaterno, apMaterno, nrocelular, rolUser, username, email } = req.body;
            try {
                let user = yield usuario_model_1.default.findOne({
                    where: {
                        username: username
                    }
                });
                if (user) {
                    res. /*status(404).*/json({ ok: false, message: "Este nombre de usuario ya esta siendo utilizado" });
                }
                else {
                    let newUser = yield usuario_model_1.default.create({
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
            }
            catch (e) {
                console.log(e);
                res.status(500).json({
                    ok: false,
                    message: 'Ha ocurrido un error inesperado',
                    dataUsers: {}
                });
            }
        });
        this.getUsers = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield usuario_model_1.default.findAll({
                    order: [
                        ['username', 'ASC']
                    ]
                });
                res.json({
                    dataUsers: users
                });
            }
            catch (e) {
                console.log(e);
            }
        });
        this.getOneUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const user = yield usuario_model_1.default.findOne({
                where: {
                    iduser: id
                }
            });
            res.json(user);
        });
        this.deleteUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const deleteRowCount = yield usuario_model_1.default.destroy({
                where: {
                    iduser: id
                }
            });
            res.json({
                message: 'Usuario eliminado satisfactoriamente',
                count: deleteRowCount
            });
        });
        this.updateUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { priNombre, secNombre, apPaterno, apMaterno, nrocelular, rolUser, username, email /*, password*/ } = req.body;
            const users = yield usuario_model_1.default.findAll({
                attributes: ['iduser', 'priNombre', 'secNombre', 'apPaterno', 'apMaterno', 'nrocelular', 'rolUser', 'username', 'email' /*, 'password'*/],
                where: {
                    iduser: id
                }
            });
            if (users.length > 0) {
                users.forEach((user) => __awaiter(this, void 0, void 0, function* () {
                    yield user.update({
                        priNombre: priNombre,
                        secNombre: secNombre,
                        apPaterno: apPaterno,
                        apMaterno: apMaterno,
                        nrocelular: nrocelular,
                        rolUser: rolUser,
                        username: username,
                        email: email,
                        //password: bcrypt.hashSync(password, 10)
                    });
                }));
            }
            return res.json({
                message: 'Usuario actualizado satisfactoriamente',
                dataUsers: users
            });
        });
        this.loginUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { username, password } = req.body;
            try {
                let user = yield usuario_model_1.default.findOne({
                    where: {
                        username: username
                    }
                });
                if (!user) {
                    res. /*status(404).*/json({ ok: false, message: "Usuario con este nombre no encontrado" });
                }
                else {
                    if (bcrypt.compareSync(password, user.password)) {
                        let token = jwt.sign({ user: user }, "secret");
                        return res.header('x-token', token).json({
                            user: user,
                            ok: true,
                            token: token
                        });
                    }
                    else {
                        return res. /*status(401).*/json({ ok: false, message: "Contraseña Incorrecta" });
                    }
                }
            }
            catch (e) {
                res.status(500).json({
                    ok: false,
                    message: 'Usuario/constraseña no son correctos',
                });
            }
        });
        this.profile = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const user = yield usuario_model_1.default.findOne({ where: { iduser: req.userId } });
            if (!user) {
                return res.status(404).json('No se encontro este usuario');
            }
            ;
            res.json(user);
            /*res.json({
                ok: true,
                user
            });*/
        });
    }
}
exports.default = UserController;
//# sourceMappingURL=usuarios.controller.js.map