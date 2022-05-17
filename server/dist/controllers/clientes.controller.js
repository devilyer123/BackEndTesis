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
const cliente_model_1 = __importDefault(require("../models/cliente.model"));
class ClientController {
    constructor() {
        this.createClient = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { nomPriCli, apePatCli, apeMatCli, userId } = req.body;
            let newClient = yield cliente_model_1.default.create({
                nomPriCli: nomPriCli,
                apePatCli: apePatCli,
                apeMatCli: apeMatCli,
                userId: userId
            }, {
                fields: ['nomPriCli', 'apePatCli', 'apeMatCli', 'userId']
            });
            res.json({ message: 'Nuevo cliente registrado' });
        });
        this.getClients = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const clients = yield cliente_model_1.default.findAll({
                    attributes: ['idcli', 'userId', 'nomPriCli', 'apePatCli', 'apeMatCli'],
                    order: [
                        ['idcli', 'ASC'] /*'DESC'*/
                    ]
                });
                res.json({ clients });
            }
            catch (e) {
                console.log(e);
            }
        });
        this.getOneClient = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const client = yield cliente_model_1.default.findOne({
                where: { idcli: id },
                attributes: ['idcli', 'userId', 'nomPriCli', 'apePatCli', 'apeMatCli']
            });
            res.json(client);
        });
        this.deleteClient = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield cliente_model_1.default.destroy({
                where: {
                    idcli: id
                }
            });
            res.json({ message: 'Cliente eliminado satisfactoriamente' });
        });
        this.updateClient = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { userId, nomPriCli, apePatCli, apeMatCli } = req.body;
            const client = yield cliente_model_1.default.findOne({
                attributes: ['nomPriCli', 'apePatCli', 'apeMatCli', 'userId', 'idcli'],
                where: { idcli: id }
            });
            const updatedClient = yield cliente_model_1.default.update({
                nomPriCli: nomPriCli,
                apePatCli: apePatCli,
                apeMatCli: apeMatCli,
                userId: userId
            }, {
                where: { idcli: id }
            });
            res.json({
                message: 'Cliente Actualizado',
                updatedClient
            });
        });
        this.getClientByUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { userId } = req.params;
            const clients = yield cliente_model_1.default.findAll({
                attributes: ['idcli', 'userId', 'nomPriCli', 'apePatCli', 'apeMatCli'],
                where: { userId }
            });
            res.json({
                dataClients: clients
            });
        });
        this.getClientByUserForReport = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { userId } = req.params;
            const clients = yield cliente_model_1.default.findAll({
                attributes: ['idcli', 'userId', 'nomPriCli', 'apePatCli', 'apeMatCli'],
                where: { userId }
            });
            res.json(clients);
        });
    }
}
exports.default = ClientController;
//# sourceMappingURL=clientes.controller.js.map