import express, { Request, Response, Router } from 'express';
import { interceptors } from 'undici-types';

interface Person {
    id: number
    name: string
    lastname: string
}
const router: Router = express.Router();
const people: Person[] = [];

//criando uma rota para cada tipo de dado que vou ter
//req: receber
//res: responder
//put: esse E esse
//patch: esse Ou esse

router
    .post('/registrar', (req: Request, res: Response) =>{
        const { id, name, lastname } = req.body
        people.push({id, name, lastname}),
        res.status(200).send({message: `Bem vindo(a) ${name} ${lastname}! Cadastro realizado com sucesso.`})
    })
    .get('/usuarios', (req: Request, res: Response) => {
        res.status(200).send({usuario: people})
    })
    .get('/usuarios/:id', (req: Request, res: Response) => {
        const { id } = req.params
        let convertedId = Number(id)
        res.status(200).send({response: people[convertedId]})
    })
    .get('/filtro', (req: Request, res: Response) => {
        const { name, lastname } = req.query
        res.status(200).send({response: `${name} ${lastname}`})
    })
    .put('/atualizar/:id', (req: Request, res: Response) => {
        const { id } = req.body
        const { name, lastname } = req.body
        res.status(200).send({response: `Atualizando usuario ${id} -> ${name} ${lastname}`})
    })
    .patch('/atualizar/:id', (req: Request, res: Response) => {
        const { id } = req.body
        const { name } = req.body
        res.status(200).send(`Nome da pessoa com ID  ${id} foi atualizado para: ${name}`)
    })
    .delete('/deletar/:id', (req: Request, res: Response) => {
        const { id } = req.params
        res.status(200).send(`Pessoa com o id:  ${id} foi deletada`)
    })

    //DESAFIO:
    .get('/user/:id', (req: Request, res: Response) => {
        const { id } = req.params
        let convertedId = Number(id)
        let user = people.find((Person) => Person.id == convertedId)
        res.status(200).send({response: user})
    })
    .put('/update/:id', (req: Request, res: Response) => {
        const { id } = req.body
        const { name, lastname } = req.body
        res.status(200).send({response: `Atualizando usuario ${id} -> ${name} ${lastname}`})
    })
    .delete('/delete/:id', (req: Request, res: Response) => {
        const { id } = req.params
        //let user = people.find((Person) => Person.id == { id })
        res.status(200).send(`Pessoa com o id:  ${id} foi deletada`)
    })
export default router;