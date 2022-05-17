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
const distribucion_1 = __importDefault(require("../models/distribucion"));
class DistributionController {
    constructor() {
        this.createDistribution = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { nomPro, cantSolic, montoTotal, estadoPedido, cliId } = req.body;
            let newDistribution = yield distribucion_1.default.create({
                nomPro: nomPro,
                cantSolic: cantSolic,
                montoTotal: montoTotal,
                estadoPedido: estadoPedido,
                cliId: cliId
            }, {
                fields: ['nomPro', 'cantSolic', 'montoTotal', 'estadoPedido', 'cliId']
            });
            res.json({ message: 'Nueva distribucion registrada' });
        });
        this.getDistributions = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const distributions = yield distribucion_1.default.findAll({
                    attributes: ['iddis', 'cliId', 'nomPro', 'cantSolic', 'montoTotal', 'estadoPedido'],
                    order: [
                        ['estadoPedido', 'ASC' /*'DESC'*/]
                    ]
                });
                res.json({ distributions });
            }
            catch (e) {
                console.log(e);
            }
        });
        this.getOneDistribution = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const distribution = yield distribucion_1.default.findOne({
                where: { iddis: id },
                attributes: ['iddis', 'cliId', 'nomPro', 'cantSolic', 'montoTotal', 'estadoPedido']
            });
            res.json(distribution);
        });
        this.deleteDistribution = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield distribucion_1.default.destroy({
                where: {
                    iddis: id
                }
            });
            res.json({ message: 'Pedido eliminado satisfactoriamente' });
        });
        this.updateDistribution = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { cliId, nomPro, cantSolic, montoTotal, estadoPedido } = req.body;
            const distribution = yield distribucion_1.default.findOne({
                attributes: ['cliId', 'nomPro', 'cantSolic', 'montoTotal', 'estadoPedido', 'iddis'],
                where: { iddis: id }
            });
            const updatedDistribution = yield distribucion_1.default.update({
                nomPro: nomPro,
                cantSolic: cantSolic,
                montoTotal: montoTotal,
                estadoPedido: estadoPedido,
                cliId: cliId
            }, {
                where: { iddis: id }
            });
            res.json({
                message: 'Distribucion Actualizada',
                updatedDistribution
            });
        });
        this.getDistributionByClient = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { cliId } = req.params;
            const distributions = yield distribucion_1.default.findAll({
                attributes: ['iddis', 'cliId', 'nomPro', 'cantSolic', 'montoTotal', 'estadoPedido', 'createdAt', 'updatedAt'],
                where: { cliId },
                order: [
                    ['estadoPedido', 'DESC']
                ]
            });
            res.json({
                dataDistributions: distributions
            });
        });
    }
}
exports.default = DistributionController;
//# sourceMappingURL=distribuciones.controller.js.map