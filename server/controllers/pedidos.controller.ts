import { Request, Response } from "express";
import Pedido from "../models/pedido.model";

export default class OrderController {
    createOrder = async (req: Request, res: Response) => {
        const { cantSolic, montoTotal, nomPro, cliId, proId } = req.body;
        let newOrder = await Pedido.create({
            cantSolic: cantSolic,
            montoTotal: montoTotal,
            nomPro: nomPro,
            cliId: cliId,
            proId: proId
        }, {
            fields: [ 'cantSolic', 'montoTotal', 'nomPro', 'cliId', 'proId' ]
        });
        res.json({message: 'Nuevo pedido registrado'});
    }

    getOrders = async (req: Request, res: Response) => {
        try {
            const orders = await Pedido.findAll({
                attributes: [ 'proId', 'nomPro', 'cantSolic', 'montoTotal', 'idped', 'cliId' ],
                order: [
                    ['proId', 'ASC']
                    //'DESC'
                ]
            });
            res.json({
                dataOrders: orders
            });
        } catch (e) {
            console.log(e);
        }
    }

    getOneOrder = async (req: Request, res: Response) => {
        const { id } = req.params;        
        const order = await Pedido.findOne({
            where: { idped: id },
            attributes: [ 'idped', 'cliId', 'proId', 'nomPro', 'cantSolic', 'montoTotal' ]
        });
        res.json(order);
    }

    deleteOrder = async (req: Request, res: Response) => {
        const { id } = req.params;
        await Pedido.destroy({
            where: {
                idped: id
            }
        });
        res.json({message: 'Pedido eliminado satisfactoriamente'});
    }

    updateOrder = async (req: Request, res: Response) => {
        const { id } = req.params;
        const { cliId, nomPro, cantSolic, montoTotal } = req.body;

        const order =  await Pedido.findOne({
            attributes: [ 'cantSolic', 'montoTotal',  'cliId', 'proId','nomPro', 'idped' ],
            where: { idped: id }
        });
        
        const updatedOrder = await Pedido.update({
            cantSolic: cantSolic,
            montoTotal: montoTotal,
            nomPro: nomPro,
            cliId: cliId
        }, {
            where: {idped: id}
        });

        res.json({
            message: 'Orden Actualizada',
            updatedOrder
        })

    }

    getOrderByClient = async (req: Request, res: Response) => {
        const { cliId } = req.params;
        const orders = await Pedido.findAll({
            attributes: [ 'idped', 'cliId', 'proId', 'nomPro', 'cantSolic', 'montoTotal', 'createdAt' ],
            where: { cliId },
            order: [
                ['createdAt', 'ASC']
            ]
        });
        res.json({
            dataOrders: orders
        });
    }


}