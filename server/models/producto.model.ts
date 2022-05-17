import Sequelize from 'sequelize';
import database from '../classes/sequelize';
import Pedido from './pedido.model';
//import Pedido from './pedido.model';
//import ListadoProducto from './listadoProducto.model';

const Producto = database.define('productos', {
    idpro: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    nomProd:{
        type: Sequelize.STRING
    },
    cantDisp: {
        type: Sequelize.INTEGER
    },
    precio: {
        type: Sequelize.INTEGER
    }
},{
    timestamps: false
});

Producto.hasMany(Pedido, { foreignKey: 'proId', sourceKey: 'idpro' } );
Pedido.belongsTo(Producto, { foreignKey: 'proId' } );

export default Producto;