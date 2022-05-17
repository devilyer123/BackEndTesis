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
const producto_model_1 = __importDefault(require("../models/producto.model"));
class ProductController {
    constructor() {
        this.createProduct = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { nomProd, cantDisp, precio } = req.body;
            try {
                let newProduct = yield producto_model_1.default.create({
                    nomProd: nomProd,
                    cantDisp: cantDisp,
                    precio: precio
                });
                if (newProduct) {
                    return res.json({
                        message: 'Producto registrado satisfactoriamente',
                        dataProds: newProduct
                    });
                }
            }
            catch (e) {
                console.log(e);
                res.status(500).json({
                    message: 'Ha ocurrido un error en el registro',
                    dataProds: {}
                });
            }
        });
        this.getProducts = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield producto_model_1.default.findAll({
                    attributes: ['idpro', 'nomProd', 'cantDisp', 'precio'],
                    order: [
                        ['idpro', 'ASC']
                    ]
                });
                res.json({
                    dataProds: products
                });
            }
            catch (e) {
                console.log(e);
            }
        });
        this.getOneProduct = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const product = yield producto_model_1.default.findOne({
                where: {
                    idpro: id
                }
            });
            res.json(product);
        });
        this.deleteProduct = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const deleteRowCount = yield producto_model_1.default.destroy({
                where: {
                    idpro: id
                }
            });
            res.json({
                message: 'Producto eliminado satisfactoriamente',
                count: deleteRowCount
            });
        });
        this.updateProduct = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { nomProd, cantDisp, precio } = req.body;
            const products = yield producto_model_1.default.findAll({
                attributes: ['idpro', 'nomProd', 'cantDisp', 'precio'],
                where: {
                    idpro: id
                }
            });
            if (products.length > 0) {
                products.forEach((product) => __awaiter(this, void 0, void 0, function* () {
                    yield product.update({
                        nomProd: nomProd,
                        cantDisp: cantDisp,
                        precio: precio
                    });
                }));
            }
            return res.json({
                message: 'Producto actualizado satisfactoriamente',
                dataProds: products
            });
        });
    }
}
exports.default = ProductController;
//# sourceMappingURL=productos.controller.js.map