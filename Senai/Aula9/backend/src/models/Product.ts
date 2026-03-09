import { truncate } from "fs/promises";
import mongoose, { Schema, Document} from "mongoose";

interface IProduct extends Document {
    name: string;
    description: string;
    price: number;
    stock: boolean;
    category: string;
    createdAt: Date;

}

const productSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: false },
        price: { type: Number, required: true },
        stock: { type: Boolean, required: true,  default: 0 },
        category: { type: String, required: false },
        createdAt: { type: Date, required: true, default: Date.now },
    },
    { versionKey: false }
);

const Product = mongoose.model<IProduct>('Product', productSchema);

export default Product;