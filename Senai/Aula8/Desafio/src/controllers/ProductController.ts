import { Request, Response} from 'express';
import User from '../models/Product.ts'

class ProductController {
    static async Post(req: Request, res: Response){

    }
    static async Get(req: Request, res: Response){
        const users = await User.find()
        return res.status(200).send({ response: users})
    }
    static async GetID(req: Request, res: Response){
        const users = await User.find()
        return res.status(200).send({ response: users})
    }
    static async Put(req: Request, res: Response){
        const users = await User.find()
        return res.status(200).send({ response: users})
    }
    static async Delete(req: Request, res: Response){
        const users = await User.find()
        return res.status(200).send({ response: users})
    }

}

export default ProductController;