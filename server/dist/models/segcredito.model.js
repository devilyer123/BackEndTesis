"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const sequelize_2 = __importDefault(require("../classes/sequelize"));
const SegCredito = sequelize_2.default.define('segCreditos', {
    idsegcre: {
        type: sequelize_1.default.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    nomPro: {
        type: sequelize_1.default.STRING
    },
    cantVend: {
        type: sequelize_1.default.INTEGER
    },
    tipoPago: {
        type: sequelize_1.default.STRING
    },
    montoCred: {
        type: sequelize_1.default.INTEGER
    },
    montoCredPend: {
        type: sequelize_1.default.INTEGER
    },
    estadoCred: {
        type: sequelize_1.default.STRING
    },
    cliId: {
        type: sequelize_1.default.INTEGER
    }
} //,{timestamps: false}
);
exports.default = SegCredito;
//# sourceMappingURL=segcredito.model.js.map