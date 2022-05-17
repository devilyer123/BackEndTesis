import { Request, Response } from "express";
import SegCredito from "../models/segcredito.model";

export default class SegCreditController {
    createCredit = async (req: Request, res: Response) => {
        const { nomPro, cantVend, tipoPago, montoCred, montoCredPend, estadoCred, cliId } = req.body;
        let newCredit = await SegCredito.create({
            nomPro: nomPro,
            cantVend: cantVend,
            tipoPago: tipoPago,
            montoCred: montoCred,
            montoCredPend: montoCredPend,
            estadoCred: estadoCred,
            cliId: cliId
        }, {
            fields: [ 'nomPro', 'cantVend', 'tipoPago', 'montoCred', 'montoCredPend', 'estadoCred', 'cliId' ]
        });
        res.json({message: 'Nuevo credito registrado'});
        /*try {
            let credit = await SegCredito.findOne({
                where: {
                    cliId: cliId
                }
            });
            if (credit) {
                res.json(credit);
                //res.json({ok: false, message: "Este usario ya tiene deudas", credit});
            } else {
                let newCredit = await SegCredito.create({
                    nomPro: nomPro,
                    cantVend: cantVend,
                    tipoPago: tipoPago,
                    montoCred: montoCred,
                    montoCredPend: montoCredPend,
                    estadoCred: estadoCred,
                    cliId: cliId
                }, {
                    fields: [ 'nomPro', 'cantVend', 'tipoPago', 'montoCred', 'montoCredPend', 'estadoCred', 'cliId' ]
                });
                return res.json({
                    ok: true,
                    message: 'Nuevo credito registrado'
                });
            }
        } catch (e) {
            console.log(e);
            res.status(500).json({
                ok: false,
                message: 'Ha ocurrido un error inesperado',
                dataUsers: {}
            });
        }*/   
    }

    getCredits = async (req: Request, res: Response) => {
        try {
            const credits = await SegCredito.findAll({
                attributes: [ 'idsegcre', 'cliId', 'nomPro', 'cantVend', 'tipoPago', 'montoCred', 'montoCredPend', 'estadoCred' ],
                order: [
                    ['idsegcre', 'ASC' /*'DESC'*/]
                ]
            });
            res.json({credits});
        } catch (e) {
            console.log(e);
        }
    }

    getOneCredit = async (req: Request, res: Response) => {
        const { id } = req.params;        
        const credit = await SegCredito.findOne({
            where: { idsegcre: id },
            attributes: [ 'idsegcre', 'cliId', 'nomPro', 'cantVend', 'tipoPago', 'montoCred', 'montoCredPend', 'estadoCred' ]
        });
        res.json(credit);
    }

    deleteCredit = async (req: Request, res: Response) => {
        const { id } = req.params;
        await SegCredito.destroy({
            where: {
                idsegcre: id
            }
        });
        res.json({message: 'Credito eliminado satisfactoriamente'});
    }

    updateCredit = async (req: Request, res: Response) => {
        const { id } = req.params;
        const { cliId, tipoPago, montoCred, montoCredPend, estadoCred } = req.body;

        const credit =  await SegCredito.findOne({
            attributes: [ 'cliId', 'nomPro', 'cantVend', 'tipoPago', 'montoCred', 'montoCredPend', 'estadoCred', 'idsegcre' ],
            where: { idsegcre: id }
        });
        
        const updatedCredit = await SegCredito.update({
            tipoPago: tipoPago,
            montoCred: montoCred,
            montoCredPend: montoCredPend,
            estadoCred: estadoCred,
            cliId: cliId
        }, {
            where: {idsegcre: id}
        });

        res.json({
            message: 'Orden Actualizada',
            updatedCredit
        })

    }

    getCreditByClient = async (req: Request, res: Response) => {
        const { cliId } = req.params;
        const credits = await SegCredito.findAll({
            attributes: [ 'idsegcre', 'cliId', 'nomPro', 'cantVend', 'tipoPago', 'montoCred', 'montoCredPend', 'estadoCred', 'updatedAt' ],
            where: { cliId },
            order: [
                ['updatedAt', 'ASC']
            ]
        });
        res.json({
            dataCredits: credits
        });
    }

    test = async (req: Request, res: Response) => {        
        res.json({
            dataCredits: true
        });
    }
}