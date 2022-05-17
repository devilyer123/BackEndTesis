import { Request, Response } from "express";
import Cliente from "../models/cliente.model";

export default class ClientController {
    createClient = async (req: Request, res: Response) => {
        const { nomPriCli, apePatCli, apeMatCli, userId } = req.body;
        let newClient = await Cliente.create({
            nomPriCli: nomPriCli,
            apePatCli: apePatCli,
            apeMatCli: apeMatCli,
            userId: userId
        }, {
            fields: [ 'nomPriCli', 'apePatCli', 'apeMatCli', 'userId' ]
        });
        res.json({message: 'Nuevo cliente registrado'});
    }

    getClients = async (req: Request, res: Response) => {
        try {
            const clients = await Cliente.findAll({
                attributes: [ 'idcli', 'userId', 'nomPriCli', 'apePatCli', 'apeMatCli' ],
                order: [
                    ['idcli', 'ASC'] /*'DESC'*/
                ]
            });
            res.json({clients});
        } catch (e) {
            console.log(e);
        }
    }

    getOneClient = async (req: Request, res: Response) => {
        const { id } = req.params;        
        const client = await Cliente.findOne({
            where: { idcli: id },
            attributes: [ 'idcli', 'userId', 'nomPriCli', 'apePatCli', 'apeMatCli' ]
        });
        res.json(client);
    }

    deleteClient = async (req: Request, res: Response) => {
        const { id } = req.params;
        await Cliente.destroy({
            where: {
                idcli: id
            }
        });
        res.json({message: 'Cliente eliminado satisfactoriamente'});
    }

    updateClient = async (req: Request, res: Response) => {
        const { id } = req.params;
        const { userId, nomPriCli, apePatCli, apeMatCli } = req.body;

        const client =  await Cliente.findOne({
            attributes: ['nomPriCli', 'apePatCli', 'apeMatCli', 'userId', 'idcli' ],
            where: { idcli: id }
        });
        
        const updatedClient = await Cliente.update({
            nomPriCli: nomPriCli,
            apePatCli: apePatCli,
            apeMatCli: apeMatCli,
            userId: userId
        }, {
            where: {idcli: id}
        });

        res.json({
            message: 'Cliente Actualizado',
            updatedClient
        })

    }

    getClientByUser = async (req: Request, res: Response) => {
        const { userId } = req.params;
        const clients = await Cliente.findAll({
            attributes: ['idcli', 'userId', 'nomPriCli', 'apePatCli', 'apeMatCli' ],
            where: { userId }
        });
        res.json({
            dataClients: clients
        });
    }

    getClientByUserForReport = async (req: Request, res: Response) => {
        const { userId } = req.params;
        const clients = await Cliente.findAll({
            attributes: ['idcli', 'userId', 'nomPriCli', 'apePatCli', 'apeMatCli' ],
            where: { userId }
        });
        res.json(clients);
    }

}