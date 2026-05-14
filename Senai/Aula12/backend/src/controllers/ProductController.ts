import { Request, Response} from 'express';
import Product from '../models/Product.ts'
import { deleteProductDTO, getIDProductDTO, getProductDTO, registerProductDTO } from '../dtos/ProdutosDTO.ts';
import { register, get, getID, update, deleteProduct } from '../services/product.service.ts';

class ProductController {

    static async Post(req: Request, res: Response){
        const data: registerProductDTO = req.body
        try{
            await register(data)
            return res.status(201).send({ response: "Cadastrado com sucesso!"})
        }
        catch{
            return res.status(500).send({ response: "Ocorreu algum erro"})
        }
    }

    static async Get(req: Request, res: Response){
        const data: getProductDTO = req.body
        try{
            const products = await get(data)
            return res.status(200).send({ response: products})
        }
        catch{
            return res.status(500).send({ response: "Produto não encontrado"})
        }
    }

    static async GetID(req: Request, res: Response){
        const id = req.params.id as string;
        try {
            const product = await getID({ id } as getIDProductDTO);
            return res.status(200).send({ response: product });
        }
        catch{
            return res.status(500).send({ response: "Produto não encontrado"})
        }
    }

    static async Put(req: Request, res: Response){
        const id = req.params.id as string;
        const data: registerProductDTO = req.body
        try{
            const updateP = await update(id, data)
            return res.status(200).send({ message: "Produto atualizado com sucesso"});
        }
        catch{
            return res.status(500).send({ response: "Produto não encontrado"})
        }
    }

    static async Delete(req: Request, res: Response){
        const id = req.params.id as string;
        try{
            const deleted = await deleteProduct(id)
            return res.status(200).send({ message: "Produto deletado com sucesso" });
        }
        catch{
            return res.status(404).send({ message: "Produto não encontrado" });
        }
    }
}

export default ProductController;