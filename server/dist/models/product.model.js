"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const sequelize_2 = __importDefault(require("../classes/sequelize"));
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
    descripcion: {
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
exports.default = Producto;
//# sourceMappingURL=product.model.js.map