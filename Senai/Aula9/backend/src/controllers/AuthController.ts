import { Request, Response } from "express";
import user from "../models/User.ts";
import CryptoJS from "crypto-js";
import dotenv from "dotenv";

dotenv.config();

class AuthController {
    static async register(req: Request, res: Response): Promise<any> {
        const { name, email, password } = req.body;
        const passwordCryptJS = CryptoJS.AES.encrypt(password, process.env.SECRET as string).toString()
        const User = new user({
            name,
            email,
            password: passwordCryptJS
        });

        try {
            await User.save();
            return res.status(201).send({ message: "Usuário cadastrado com sucesso" });
        } 
        catch (error) {
            return res.status(500).send({ message: "Something failed" });
        }        
    }

    static async login(req: Request, res: Response): Promise<any> {
        const { email, password } = req.body;
        const User = await user.findOne({ email });

        if(User)
        {
            var bytes = CryptoJS.AES.decrypt(User.password, process.env.SECRET as string);
            const passwordDescrypted = bytes.toString(CryptoJS.enc.Utf8);
            if(password !== passwordDescrypted){
                throw new Error('Usuário e/ou senha inválida');
            }
        }
        else{
            return res.status(404).send("User not found");
        }
    }
}

export default AuthController;