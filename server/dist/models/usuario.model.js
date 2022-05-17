"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const sequelize_2 = __importDefault(require("../classes/sequelize"));
const cliente_model_1 = __importDefault(require("./cliente.model"));
const Usuario = sequelize_2.default.define('usuarios', {
    iduser: {
        type: sequelize_1.default.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    priNombre: {
        type: sequelize_1.default.STRING
    },
    secNombre: {
        type: sequelize_1.default.STRING
    },
    apPaterno: {
        type: sequelize_1.default.STRING
    },
    apMaterno: {
        type: sequelize_1.default.STRING
    },
    nrocelular: {
        type: sequelize_1.default.INTEGER
        //unique: true
    },
    rolUser: {
        type: sequelize_1.default.STRING
    },
    username: {
        type: sequelize_1.default.STRING
        //unique: true
    },
    email: {
        type: sequelize_1.default.STRING
        //unique: true
    },
    password: {
        type: sequelize_1.default.STRING
    }
} /*, {
    timestamps: false,
}*/);
// Un Usuario tiene muchos Clientes
Usuario.hasMany(cliente_model_1.default, { foreignKey: 'userId', sourceKey: 'iduser' });
// Un Cliente tiene solamente un Usuario
cliente_model_1.default.belongsTo(Usuario, { foreignKey: 'userId' /*, sourceKey: 'idcli' */ });
exports.default = Usuario;
//# sourceMappingURL=usuario.model.js.map