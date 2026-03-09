import { Request, Response, NextFunction } from 'express';
import User from '../models/Product.ts';
import Product from '../models/Product.ts';

export const validateRegister = async (req: Request, res: Response, next: NextFunction) => {
    const { name, price } = req.body
    if (!name || !price ){
        return res.status(400).send({ response: "name and price is required!"})
    }
    next();
}

export const validation = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).send("Produto não encontrado");
        }
        req.body.product = product; 
        next();
    } 
    catch (error) {
        return res.status(500).send("Erro ao buscar produto");
    }
}