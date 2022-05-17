import Sequelize from 'sequelize';
import database from '../classes/sequelize';

import Cliente from './cliente.model';

const Usuario = database.define('usuarios', {
    iduser: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    priNombre: {
        type: Sequelize.STRING
    },
    secNombre: {
        type: Sequelize.STRING
    },
    apPaterno: {
        type: Sequelize.STRING
    },
    apMaterno: {
        type: Sequelize.STRING
    },
    nrocelular: {
        type: Sequelize.INTEGER
        //unique: true
    },
    rolUser: {
        type: Sequelize.STRING
    },
    username: {
        type: Sequelize.STRING
        //unique: true
    },
    email: {
        type: Sequelize.STRING
        //unique: true
    },
    password:{
        type: Sequelize.STRING
    }
}/*, {
    timestamps: false,
}*/);

// Un Usuario tiene muchos Clientes
Usuario.hasMany(Cliente, { foreignKey: 'userId', sourceKey: 'iduser' } );
// Un Cliente tiene solamente un Usuario
Cliente.belongsTo(Usuario, { foreignKey: 'userId'/*, sourceKey: 'idcli' */} );

export default Usuario;
