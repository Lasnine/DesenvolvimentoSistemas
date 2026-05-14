import { getIDProductDTO, getProductDTO, registerProductDTO } from "../dtos/ProdutosDTO";
import Product from "../models/Product";

export async function register(data: registerProductDTO){
    const createdAt = new Date()
    const { name, description, price, stock, category } = data
    const product = new Product({
        name: name, 
        description: description,
        price: Number(price),
        stock: stock,
        category: category
    })
    return await product.save()

}

export async function get(data: getProductDTO) {
    return await Product.find(data)
}

export async function getID(data: getIDProductDTO) {
    return await Product.findById(data.id)
}

export async function update(id: string, data: registerProductDTO){
    const product = await Product.findById(id);
    if (!product) throw new Error("Produto não encontrado");
    const { name, description, price, stock, category } = data;
    if (name) product.name = name;
    if (description) product.description = description;
    if (price) product.price = price;
    if (stock) product.stock = stock;
    if (category) product.category = category;

    return await product.save();
}

export async function deleteProduct(id: string) {
    return await Product.findByIdAndDelete(id);
}