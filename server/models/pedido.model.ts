import Sequelize from 'sequelize';
import database from '../classes/sequelize';

const Pedido = database.define('pedidos', {
    idped: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull:false
    },
    cantSolic: {
        type: Sequelize.INTEGER
    },
    montoTotal: {
        type: Sequelize.INTEGER
    },
    nomPro: {
        type: Sequelize.STRING
    },
    cliId: {
        type: Sequelize.INTEGER
    },
    proId: {
        type: Sequelize.INTEGER
    }
}//,{timestamps: false}
);

export default Pedido;