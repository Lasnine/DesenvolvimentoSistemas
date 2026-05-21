import { Response, Request, response } from 'express'
import Product from '../models/product'
import { registerProductDTO } from '../dtos/productDTO'
import { register } from '../services/product.service'

class ProductController {
    static async create (req: Request, res: Response){
        const data: registerProductDTO = req.body
        try{
            await register(data)
            return res.status(201).send({ message: "Produto cadastrado com sucesso!"})
        }
        catch{
            return res.status(500).send({ message: "Ocorreu algum erro durante o registro de produto."})
        }
    }
    
    static async findAll (req: Request, res: Response){
        const {name, category, minPrice, maxPrice} = req.query
        const convertedMinPrice = Number(minPrice)
        const convertedMaxPrice = Number(maxPrice)
        const product = await Product.find({
            name: name,
            category: category,
            price: { $gte: convertedMinPrice, $lte: convertedMaxPrice },
            stock: { $gt: 0}
        })
        return res.status(200).send({response: product})
    }
    static async findById (req: Request, res: Response){
        try{
            const {id} = req.params
            const product = await Product.findById(id)
            return res.status(200).send({response: product})
        }
        catch{
            return res.status(404).send({response: `Usuário não encontrado!`})

        }
    }
    static async find (req: Request, res: Response){
        const products = await Product.find()
        res.status(200).send({users : products})
    }
    static async update (req: Request, res: Response){
        const {id} = req.params
        const {name, description, price, stock, category} = req.body
        try{
            await Product.findByIdAndUpdate(id , { name, description, price, stock, category})
            const product = await Product.findById(id)
            return res.status(200).send({response: product})
        }
        catch{
            return res.status(404).send({ response: `Usuário não encontrado!`})
        }
    }
    static async remove (req: Request, res: Response){
        const {id} = req.params
        try{
            await Product.findByIdAndDelete(id)
            return res.status(200).send({response: `Usuário deletado`})
        }
        catch{
            return res.status(404).send({ response: `Usuário não encontrado!`})
        }
    }
}

export default ProductController