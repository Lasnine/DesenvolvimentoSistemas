import express, { Request, Response, Router } from 'express';
import { create } from 'node:domain';
import { interceptors } from 'undici-types';

interface Person {
    id: number;
    name: string;
    email: string;
    type: "Aluno" | "Professor" | "Coordenador";
    active: boolean;
    createdAt: Date;
}
const router: Router = express.Router();
const people: Person[] = [];

router
    .post('/usuarios', (req: Request, res: Response) =>{
        const { id, name, email, type, active = true, createdAt } = req.body;
        if(!email || !name || !id)
            {
                res.status(404).send({message: `Email e nome são obrigatorios`})
                return;
            }
        let validation = people.find((Person) => Person.email == email)
        let validationId = people.find((Person) => Person.id == id)
        if(validation)
            {
                res.status(400).send({message: `Email já esta em uso`})
                return;
            }
        if(validationId)
            {
                res.status(400).send({message: `ID já esta em uso`})
                return;
            }
        people.push({id, name, email, type, active, createdAt}),
        res.status(201).send({message: `Bem vindo(a) ${name}! Cadastro realizado com sucesso.`})
    })

    .get('/usuarios', (req: Request, res: Response) => {
        const { type } = req.query
        if(type)
            {
                const filter = people.filter(people => people.type == type)
                res.status(200).send({response: filter})
            }
        res.status(200).send({response: people})
    })

    .get('/usuarios/:id', (req: Request, res: Response) => {
        const { id } = req.params
        let user = UserId(id as string, res as Response)
        if(user)
            {
                res.status(200).send({response: user})
                return;
            }
        res.status(404).send({message: `Esse id não existe`})
    })

    .put('/usuarios/:id', (req: Request, res: Response) => {
        const { name, email, type, active, createdAt } = req.body
        const { id } = req.params
        let update = UserId(id as string, res as Response)
        if(!update)
        {
            res.status(404).send({message: `Usuario não encontrado, id invalido`})
            return;
        }
        const pos = people.indexOf(update)
        update = { id: Number(id), name, email, type, active, createdAt }
        people.splice(pos, 1, update)

        res.status(200).send({response: `Atualizando usuario ${id} -> ${name}`})
    })

    .patch('/usuarios/:id', (req: Request, res: Response) => {
        const patch = req.body
        const { id } = req.params
        const user = UserId(id as string, res as Response)
        if(!user) return;
        if(patch.id)
        {
            res.status(400).send({message: `Não pode alterar o ID`})
            return;
        }
        Object.assign(user, req.body)
        res.status(200).send( `Usuario ${patch.name} atualizado com sucesso`)
    })

    .delete('/usuarios/:id', (req: Request, res: Response) => {
        const { id } = req.params
        const user = UserId(id as string, res as Response)
        if(!user) return;
        const i = people.indexOf(user)
        people.splice(i, 1)
        res.status(200).send( `Usuario deletado com sucesso`)
    })

    function UserId (id: string, res: Response): Person|null{
        const find = people.find(user => user.id == Number(id))
        if(find)
        {
            return find;
        }
        res.status(404).send("Usuario não existe")
        return null;
    }
export default router;