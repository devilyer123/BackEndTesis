import { Response, Router } from "express";
import UserController from '../controllers/usuarios.controller';
import ProductController from "../controllers/productos.controller";
import ClientController from '../controllers/clientes.controller';

import { TokenValidation } from '../middlewares/autenticacion';
import OrderController from "../controllers/pedidos.controller";
import DistributionController from "../controllers/distribuciones.controller";
import SegCreditController from "../controllers/segcreditos.controller";

class UserRoutes {
    static init(router: Router) {

        //apis de usuario /api/v1/
        router.post('/user/create', this.userController.createUser);

        router.get('/users',this.userController.getUsers);

        router.get('/users/:id', this.userController.getOneUser);

        router.delete('/users/:id', this.userController.deleteUser);

        router.put('/users/:id', this.userController.updateUser);

        router.post('/users/login', this.userController.loginUser);

        router.get('/profile', TokenValidation ,this.userController.profile);

        //apis de producto /api/v1/
        router.post('/products/create', this.productController.createProduct);

        router.get('/products', this.productController.getProducts);

        router.get('/products/:id', this.productController.getOneProduct);
        
        router.delete('/products/:id', this.productController.deleteProduct);

        router.put('/products/:id', this.productController.updateProduct);

        //apis de cliente
        router.post('/clients/create', this.clientController.createClient);

        router.get('/clients', this.clientController.getClients);

        router.delete('/clients/:id', this.clientController.deleteClient);

        router.put('/clients/:id', this.clientController.updateClient);

        router.get('/clients/:id', this.clientController.getOneClient);

        router.get('/clients/user/:userId', this.clientController.getClientByUser);

        router.get('/clients/user/report/:userId', this.clientController.getClientByUserForReport);

        //apis de pedidos
        router.post('/orders/create', this.orderController.createOrder);

        router.get('/orders', this.orderController.getOrders);

        router.delete('/orders/:id', this.orderController.deleteOrder);

        router.put('/orders/:id', this.orderController.updateOrder);

        router.get('/orders/:id', this.orderController.getOneOrder);

        router.get('/orders/client/:cliId', this.orderController.getOrderByClient);

        //apis de distribucion
        router.post('/distributions/create', this.distributionController.createDistribution);

        router.get('/distributions', this.distributionController.getDistributions);

        router.delete('/distributions/:id', this.distributionController.deleteDistribution);

        router.put('/distributions/:id', this.distributionController.updateDistribution);

        router.get('/distributions/:id', this.distributionController.getOneDistribution);

        router.get('/distributions/client/:cliId', this.distributionController.getDistributionByClient);

        //apis de credito
        router.post('/credits/create', this.segCreditController.createCredit);

        router.get('/credits', this.segCreditController.getCredits);

        router.delete('/credits/:id', this.segCreditController.deleteCredit);

        router.put('/credits/:id', this.segCreditController.updateCredit);

        router.get('/credits/:id', this.segCreditController.getOneCredit);

        router.get('/credits/client/:cliId', this.segCreditController.getCreditByClient);

        //apis test
        router.get('/test', this.segCreditController.test);

    }
    static userController = new UserController();
    static productController = new ProductController();
    static clientController = new ClientController();
    static orderController = new OrderController();
    static distributionController = new DistributionController();
    static segCreditController = new SegCreditController();
}

export default UserRoutes;