import UserRoutes from './usuario';
import { Router, Express } from 'express';

class Routes {

    public router: Router;
    private app: Express;

    constructor(app: Express) {
        this.router = Router();
        this.app = app;
    }

    public init(): void {
        UserRoutes.init(this.router);
        this.app.use('/api/v1', this.router);
    }

}

export default Routes;