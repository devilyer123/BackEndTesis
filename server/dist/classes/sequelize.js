"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dist_1 = require("sequelize/dist");
const database = new dist_1.Sequelize({
    dialect: 'postgres',
    host: 'localhost',
    database: 'ProjectTesis',
    username: 'postgres',
    password: 'rolo123'
});
/*const database = new Sequelize({
    dialect: 'postgres',
    host: 'databaseaws.cu6cslmre0vv.us-east-1.rds.amazonaws.com',
    port: 5432,
    database: 'ProjectTesisAWS',
    username: 'postgres',
    password: 'rolo123456'
});*/
exports.default = database;
//# sourceMappingURL=sequelize.js.map