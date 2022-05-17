"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const sequelize_2 = __importDefault(require("../classes/sequelize"));
const pedido_model_1 = __importDefault(require("./pedido.model"));
const distribucion_1 = __importDefault(require("./distribucion"));
const segcredito_model_1 = __importDefault(require("./segcredito.model"));
const Cliente = sequelize_2.default.define('clientes', {
    idcli: {
        type: sequelize_1.default.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    nomPriCli: {
        type: sequelize_1.default.STRING
    },
    apePatCli: {
        type: sequelize_1.default.STRING
    },
    apeMatCli: {
        type: sequelize_1.default.STRING
    },
    userId: {
        type: sequelize_1.default.INTEGER
    }
} //,{timestamps: false}
);
Cliente.hasMany(pedido_model_1.default, { foreignKey: 'cliId', sourceKey: 'idcli' });
pedido_model_1.default.belongsTo(Cliente, { foreignKey: 'cliId' });
Cliente.hasMany(distribucion_1.default, { foreignKey: 'cliId', sourceKey: 'idcli' });
distribucion_1.default.belongsTo(Cliente, { foreignKey: 'cliId' });
Cliente.hasMany(segcredito_model_1.default, { foreignKey: 'cliId', sourceKey: 'idcli' });
segcredito_model_1.default.belongsTo(Cliente, { foreignKey: 'cliId' });
exports.default = Cliente;
//# sourceMappingURL=cliente.model.js.map