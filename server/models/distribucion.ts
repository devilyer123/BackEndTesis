import Sequelize from 'sequelize';
import database from '../classes/sequelize';

const Distribucion = database.define('distribuciones', {
    iddis: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull:false
    },
    nomPro: {
        type: Sequelize.STRING
    },
    cantSolic: {
        type: Sequelize.INTEGER
    },
    montoTotal: {
        type: Sequelize.INTEGER
    },
    estadoPedido: {
        type: Sequelize.STRING
    },
    cliId: {
        type: Sequelize.INTEGER
    }

}//,{timestamps: false}
);

export default Distribucion;