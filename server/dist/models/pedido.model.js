"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const sequelize_2 = __importDefault(require("../classes/sequelize"));
const Pedido = sequelize_2.default.define('pedidos', {
    idped: {
        type: sequelize_1.default.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    cantSolic: {
        type: sequelize_1.default.INTEGER
    },
    montoTotal: {
        type: sequelize_1.default.INTEGER
    },
    nomPro: {
        type: sequelize_1.default.STRING
    },
    cliId: {
        type: sequelize_1.default.INTEGER
    },
    proId: {
        type: sequelize_1.default.INTEGER
    }
} //,{timestamps: false}
);
exports.default = Pedido;
//# sourceMappingURL=pedido.model.js.map