import { Request, Response } from "express";
import Producto from "../models/producto.model";

export default class ProductController {
    createProduct = async (req: Request, res: Response) => {
        const { nomProd, cantDisp, precio } = req.body;
        try {
            let newProduct = await Producto.create({
                nomProd: nomProd,
                cantDisp: cantDisp,
                precio: precio
            });
            if (newProduct) {
                return res.json({
                    message: 'Producto registrado satisfactoriamente',
                    dataProds: newProduct
                });
            }
        } catch (e) {
            console.log(e);
            res.status(500).json({
                message: 'Ha ocurrido un error en el registro',
                dataProds: {}
            });
        }
    }

    getProducts = async (req: Request, res: Response) => {
        try {
            const products = await Producto.findAll({
                attributes: ['idpro', 'nomProd', 'cantDisp', 'precio'],
                order: [
                    ['idpro', 'ASC']
                ]
            });
            res.json({
                dataProds: products
            });
        } catch (e) {
            console.log(e);
        }
    }

    getOneProduct = async (req: Request, res: Response) => {
        const { id } = req.params;
        const product = await Producto.findOne({
            where: {
                idpro: id
            }
        })
        res.json(product);
    }

    deleteProduct = async (req: Request, res: Response) => {
        const { id } = req.params;
        const deleteRowCount = await Producto.destroy({
            where: {
                idpro: id
            }
        });
        res.json({
            message: 'Producto eliminado satisfactoriamente',
            count: deleteRowCount
        });
    }

    updateProduct = async (req: Request, res: Response) => {
        const { id } = req.params;
        const { nomProd, cantDisp, precio } = req.body;

        const products = await Producto.findAll({
            attributes: [ 'idpro', 'nomProd', 'cantDisp', 'precio' ],
            where: {
                idpro: id
            }
        });

        if(products.length > 0) {
            products.forEach(async product => {
                await product.update({
                    nomProd: nomProd,
                    cantDisp: cantDisp,
                    precio: precio
                });
            })
        }

        return res.json({
            message: 'Producto actualizado satisfactoriamente',
            dataProds: products
        })
    }

}