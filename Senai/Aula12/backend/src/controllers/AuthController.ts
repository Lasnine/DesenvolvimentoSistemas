import { Request, Response } from "express";
import user from "../models/User.ts";
import CryptoJS from "crypto-js";

class AuthController {
   static async getUsers(req: Request, res: Response): Promise<any> {
        try {
            const users = await user.find({});
            return res.status(200).send({ response: users });
        } 
        catch (err) {
            console.error('Erro ao buscar usuários:', err);
            return res.status(500).send({ error: 'Erro ao buscar usuários', details: err });
        }
    }
    static async register(req: Request, res: Response): Promise<any> {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).send({ message: "Todos os campos são obrigatórios" });
        }
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
            console.error("Erro ao registrar usuário:", error);
            return res.status(500).send({ message: "Erro ao registrar usuário"});
        }        
    }

    static async login(req: Request, res: Response): Promise<any> {
        const { email, password } = req.body;
        const User = await user.findOne({ email });

        if (User) {
            const bytes = CryptoJS.AES.decrypt(User.password, process.env.SECRET as string);
            const passwordDecrypted = bytes.toString(CryptoJS.enc.Utf8);

            if (password !== passwordDecrypted) {
                return res.status(401).send({ message: "Usuário e/ou senha inválidos" });
            }

            return res.status(200).send({ message: "Login bem-sucedido", user: User });
        } else {
            return res.status(404).send({ message: "Usuário não encontrado" });
        }
    }
}

export default AuthController;