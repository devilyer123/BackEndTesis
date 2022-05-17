import { Request, Response } from "express";
import Distribucion from '../models/distribucion';

export default class DistributionController {
    createDistribution = async (req: Request, res: Response) => {
        const { nomPro, cantSolic, montoTotal, estadoPedido, cliId } = req.body;
        let newDistribution = await Distribucion.create({
            nomPro: nomPro,
            cantSolic: cantSolic,
            montoTotal: montoTotal,
            estadoPedido: estadoPedido,
            cliId: cliId
        }, {
            fields: [ 'nomPro', 'cantSolic', 'montoTotal', 'estadoPedido', 'cliId' ]
        });
        res.json({message: 'Nueva distribucion registrada'});
    }

    getDistributions = async (req: Request, res: Response) => {
        try {
            const distributions = await Distribucion.findAll({
                attributes: [ 'iddis', 'cliId', 'nomPro', 'cantSolic', 'montoTotal', 'estadoPedido' ],
                order: [
                    ['estadoPedido', 'ASC' /*'DESC'*/]
                ]
            });
            res.json({distributions});
        } catch (e) {
            console.log(e);
        }
    }

    getOneDistribution = async (req: Request, res: Response) => {
        const { id } = req.params;        
        const distribution = await Distribucion.findOne({
            where: { iddis: id },
            attributes: [ 'iddis', 'cliId', 'nomPro', 'cantSolic', 'montoTotal', 'estadoPedido' ]
        });
        res.json(distribution);
    }

    deleteDistribution = async (req: Request, res: Response) => {
        const { id } = req.params;
        await Distribucion.destroy({
            where: {
                iddis: id
            }
        });
        res.json({message: 'Pedido eliminado satisfactoriamente'});
    }

    updateDistribution = async (req: Request, res: Response) => {
        const { id } = req.params;
        const { cliId, nomPro, cantSolic, montoTotal, estadoPedido } = req.body;

        const distribution =  await Distribucion.findOne({
            attributes: [ 'cliId', 'nomPro', 'cantSolic', 'montoTotal', 'estadoPedido', 'iddis' ],
            where: { iddis: id }
        });
        
        const updatedDistribution = await Distribucion.update({
            nomPro: nomPro,
            cantSolic: cantSolic,
            montoTotal: montoTotal,
            estadoPedido: estadoPedido,
            cliId: cliId
        }, {
            where: {iddis: id}
        });

        res.json({
            message: 'Distribucion Actualizada',
            updatedDistribution
        })

    }

    getDistributionByClient = async (req: Request, res: Response) => {
        const { cliId } = req.params;
        const distributions = await Distribucion.findAll({
            attributes: [ 'iddis', 'cliId', 'nomPro', 'cantSolic', 'montoTotal', 'estadoPedido', 'createdAt', 'updatedAt' ],
            where: { cliId },
            order: [
                ['estadoPedido', 'DESC']
            ]
        });
        res.json({
            dataDistributions: distributions
        });
    }
}