"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const sequelize_2 = __importDefault(require("../classes/sequelize"));
const distribucion_model_1 = __importDefault(require("./distribucion.model"));
const SegCredito = sequelize_2.default.define('segCreditos', {
    idsegcre: {
        type: sequelize_1.default.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    tipoPago: {
        type: sequelize_1.default.STRING
    },
    montoCobrar: {
        type: sequelize_1.default.INTEGER
    },
    estadCred: {
        type: sequelize_1.default.STRING
    },
    cliId: {
        type: sequelize_1.default.INTEGER
    }
});
SegCredito.hasMany(distribucion_model_1.default, { foreignKey: 'segCreId', sourceKey: 'idsegcre' });
distribucion_model_1.default.belongsTo(SegCredito, { foreignKey: 'segCreId' });
exports.default = SegCredito;
//# sourceMappingURL=creditos.model.js.map