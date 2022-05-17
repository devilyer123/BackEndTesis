"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const usuarios_controller_1 = __importDefault(require("../controllers/usuarios.controller"));
const productos_controller_1 = __importDefault(require("../controllers/productos.controller"));
const clientes_controller_1 = __importDefault(require("../controllers/clientes.controller"));
const autenticacion_1 = require("../middlewares/autenticacion");
const pedidos_controller_1 = __importDefault(require("../controllers/pedidos.controller"));
const distribuciones_controller_1 = __importDefault(require("../controllers/distribuciones.controller"));
const segcreditos_controller_1 = __importDefault(require("../controllers/segcreditos.controller"));
class UserRoutes {
    static init(router) {
        //apis de usuario /api/v1/
        router.post('/user/create', this.userController.createUser);
        router.get('/users', this.userController.getUsers);
        router.get('/users/:id', this.userController.getOneUser);
        router.delete('/users/:id', this.userController.deleteUser);
        router.put('/users/:id', this.userController.updateUser);
        router.post('/users/login', this.userController.loginUser);
        router.get('/profile', autenticacion_1.TokenValidation, this.userController.profile);
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
}
UserRoutes.userController = new usuarios_controller_1.default();
UserRoutes.productController = new productos_controller_1.default();
UserRoutes.clientController = new clientes_controller_1.default();
UserRoutes.orderController = new pedidos_controller_1.default();
UserRoutes.distributionController = new distribuciones_controller_1.default();
UserRoutes.segCreditController = new segcreditos_controller_1.default();
exports.default = UserRoutes;
//# sourceMappingURL=usuario.js.map