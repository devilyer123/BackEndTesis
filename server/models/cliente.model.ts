import Sequelize from 'sequelize';
import database from '../classes/sequelize';
import Pedido from './pedido.model';
import Distribucion from './distribucion';
import SegCredito from './segcredito.model';

const Cliente = database.define('clientes', {
    idcli: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull:false
    },
    nomPriCli: {
        type: Sequelize.STRING
    },
    apePatCli: {
        type: Sequelize.STRING
    },
    apeMatCli: {
        type: Sequelize.STRING
    },
    userId: {
        type: Sequelize.INTEGER
    }
}//,{timestamps: false}
);

Cliente.hasMany(Pedido, { foreignKey: 'cliId', sourceKey: 'idcli' } );
Pedido.belongsTo(Cliente, { foreignKey: 'cliId' } );

Cliente.hasMany(Distribucion, { foreignKey: 'cliId', sourceKey: 'idcli' } );
Distribucion.belongsTo(Cliente, { foreignKey: 'cliId' } );

Cliente.hasMany(SegCredito, { foreignKey: 'cliId', sourceKey: 'idcli' } );
SegCredito.belongsTo(Cliente, { foreignKey: 'cliId' } );

export default Cliente;