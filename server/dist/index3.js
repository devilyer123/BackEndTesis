"use strict";
/*import Server from "./classes/server";
import userRoutes from "./routes/usuario";
import bodyParser from 'body-parser';
//const Sequelize = require('sequelize');
import {Sequelize} from 'sequelize'

const server = new Server();

// body parser
server.app.use(bodyParser.urlencoded({extended: true}));
server.app.use(bodyParser.json());

//rutas de app
server.app.use('/api', userRoutes);

//conectar base de datos
export const sequelize = new Sequelize('ProjectTesis', 'postgres', 'rolo123', {
    dialect: 'postgres',
    host: 'localhost'
});

//verificar conexion con la base de datos
sequelize.authenticate().then(() => {
    console.log('Conexión establecida exitosamente.');
  })
  .catch((err: any) => {
    console.error('No se puedo conectar a la base de datos:', err);
  });

//levantar servidor
server.start( () => {
    console.log(`Servidor corriendo en puerto ${ server.port }`);
})*/ 
//# sourceMappingURL=index3.js.map