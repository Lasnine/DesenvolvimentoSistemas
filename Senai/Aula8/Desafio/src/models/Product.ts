import { truncate } from "fs/promises";
import mongoose, { Schema, Document} from "mongoose";

interface IProduct extends Document {
    id : number;
    name: string;
    description: string;
    price: number;
    stock: number;
    category: string;
    createdAt: Date;

}

const productSchema: Schema = new Schema(
    {
        id: { type: Number, required: true, unique: true},
        name: { type: String, required: true },
        description: { type: String, required: false },
        price: { type: Number, required: true },
        stock: { type: Boolean, required: true,  default: 0 },
        category: { type: Boolean, required: false },
        createdAt: { type: Date, required: true, default: Date.now },
    },
    { versionKey: false }
);

const Product = mongoose.model<IProduct>('Product', productSchema);

export default Product;