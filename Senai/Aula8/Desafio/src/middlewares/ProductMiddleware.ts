import { Request, Response, NextFunction } from 'express';
import User from '../models/Product.ts';

export const validateRegister = async (req: Request, res: Response, next: NextFunction) => {
    const { id, name } = req.body
    if (!name || !id){
        return res.status(400).send({ response: "ID, name and email are required!"})
    }
    let checkID = await User.findOne({ id });

    if (checkID) {
        res.status(400).send("ID already in use!");
        return;
    }
    next();
}