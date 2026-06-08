import { Request, response, Response } from "express";
import { registerUserDto, updateUserDto } from "../dtos/userDTO";
import { deleteUser, registerUser, showUsers, updateUser } from "../services/user.service";
import { data } from "react-router-dom";

export default class UserController {
    static async create(req: Request, res: Response){
        const data: registerUserDto = req.body
        try{
            await registerUser(data)
            return res.status(200).send({ response: "Usuário registrado com sucesso!" })
        }
        catch(e){
            return res.status(500).send({ response: "Ocorreu algum erro no servidor" })
        }
    }

    static async show(req: Request, res: Response){
        try{
            const user = await showUsers()
            return res.status(200).send({ response: {user}})
        }
        catch(e){
            return res.status(404).send({ response: "User não encontrado" })
        }
    }

    static async update(req: Request, res: Response){
        const {id} = req.params
        const data: updateUserDto = req.body
        try{
            const user = await updateUser(data, Number(id))
            return res.status(200).send({ response: {user}})
        }
        catch(e){
            return res.status(404).send({ response: "User não encontrado" })
        }
    }

    static async delete(req: Request, res: Response){
        const {id} = req.params
    
        try{
            const user = await deleteUser(Number(id))
            return res.status(200).send({ response: `Usuario ${user} deletado com sucesso`})
        }
        catch(e){
            return res.status(500).send({ response: "Erro no servidor" })
        }
    }
}
