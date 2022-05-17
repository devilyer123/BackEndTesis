import express, { Application } from 'express';
import database from '../classes/sequelize';
import Routes from '../routes/index.routes';
import bodyParser from 'body-parser';
import cors from 'cors';

class Server {

    private app: any;

    constructor(private port?: number | string) {

        this.app = express();
        this.settings();
        this.dbConnection();
        this.middlewares();
        this.routes();

    }

    settings() {
        this.app.set('port', this.port || process.env.PORT || 3000);

        this.app.use( cors({ origin:true, credentials: true }) );
    }

    async dbConnection() {

        try {

            await database.authenticate().catch((error: any) => console.log(error));
            console.log('Database Online');
            this.syncModels();

        } catch (error: any) {

            throw new Error(error);

        }

    }

    async syncModels() {

        try {

            await database.sync({ force: false }).then((e: any) => {
                console.log('synchronized ');
            }).catch((e: any) => {
                console.log(e, 'error')
            });

        } catch (error: any) {

            throw new Error(error);

        }

    }

    middlewares() {
        this.app.use(express.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
    }

    routes() {

        const routes = new Routes(this.app);
        routes.init();

    }

    async listen() {

        const port = this.app.get('port');
        await this.app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });

    }

}

export default Server;