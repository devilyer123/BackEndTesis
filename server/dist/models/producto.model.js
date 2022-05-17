"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const sequelize_2 = __importDefault(require("../classes/sequelize"));
const pedido_model_1 = __importDefault(require("./pedido.model"));
//import Pedido from './pedido.model';
//import ListadoProducto from './listadoProducto.model';
const Producto = sequelize_2.default.define('productos', {
    idpro: {
        type: sequelize_1.default.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    nomProd: {
        type: sequelize_1.default.STRING
    },
    cantDisp: {
        type: sequelize_1.default.INTEGER
    },
    precio: {
        type: sequelize_1.default.INTEGER
    }
}, {
    timestamps: false
});
Producto.hasMany(pedido_model_1.default, { foreignKey: 'proId', sourceKey: 'idpro' });
pedido_model_1.default.belongsTo(Producto, { foreignKey: 'proId' });
exports.default = Producto;
//# sourceMappingURL=producto.model.js.map