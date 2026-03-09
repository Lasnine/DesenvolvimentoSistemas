import { Request, Response} from 'express';
import Product from '../models/Product.ts'
class ProductController {

    static async Post(req: Request, res: Response){
        const {name, description, price, stock, category} = req.body
        const product = new Product({
            name: name, 
            description: description,
            price: Number(price),
            stock: stock,
            category: category
        })
        product.save()
        return res.status(200).send({ response: "Cadastrado com sucesso!"})
    }

    static async Get(req: Request, res: Response){
        const product = await Product.find()
        return res.status(200).send({ response: product})
    }

    static async GetID(req: Request, res: Response){
        const product = await Product.find()
        return res.status(200).send({ response: product})
    }

    static async Put(req: Request, res: Response){
        const product = req.body.product
        const { name, description, price, stock, category } = req.body
        if (name) product.name = name
        if (description) product.description = description
        if (price) product.price = price
        if (stock) product.stock = stock
        if (category) product.category = category

        await product.save()
        return res.status(200).send({message: "Produto atualizado com sucesso"})
    }

    static async Delete(req: Request, res: Response){
        const product = req.body.product
        
        await product.deleteOne()
        return res.status(200).send({message: "Produto deletado com sucesso"})
    }

}

export default ProductController;