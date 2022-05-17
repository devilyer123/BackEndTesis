"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const sequelize_2 = __importDefault(require("../classes/sequelize"));
const pedido_model_1 = __importDefault(require("./pedido.model"));
const Distribucion = sequelize_2.default.define('disitrbuciones', {
    iddis: {
        type: sequelize_1.default.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    estPedido: {
        type: sequelize_1.default.STRING
    },
    prodEntregados: {
        type: sequelize_1.default.INTEGER
    },
    cliId: {
        type: sequelize_1.default.INTEGER
    },
    segCreId: {
        type: sequelize_1.default.INTEGER
    }
});
Distribucion.hasMany(pedido_model_1.default, { foreignKey: 'disId', sourceKey: 'iddis' });
pedido_model_1.default.belongsTo(Distribucion, { foreignKey: 'disId' });
exports.default = Distribucion;
//# sourceMappingURL=distribucion.model.js.map