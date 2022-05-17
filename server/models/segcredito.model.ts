import Sequelize from 'sequelize';
import database from '../classes/sequelize';

const SegCredito = database.define('segCreditos', {
    idsegcre: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull:false
    },
    nomPro: {
        type: Sequelize.STRING
    },
    cantVend: {
        type: Sequelize.INTEGER
    },
    tipoPago: {
        type: Sequelize.STRING
    },
    montoCred: {
        type: Sequelize.INTEGER
    },
    montoCredPend: {
        type: Sequelize.INTEGER
    },
    estadoCred: {
        type: Sequelize.STRING
    },
    cliId: {
        type: Sequelize.INTEGER
    }
}//,{timestamps: false}
);

export default SegCredito;