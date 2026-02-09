import express, { Request, Response, Router } from 'express';

const router: Router = express.Router();
const people: object[] = [];

router
    .post('/registrar', (req: Request, res: Response) =>{
        const { name, lastname } = req.body
        people.push(name, lastname),
        res.status(200).send({message: `Bem vindo(a) ${name} ${lastname}! Cadastro realizado com sucesso.`})
    })
    .get('/usuarios', (req: Request, res: Response) => {
        res.status(200).send({usuario: people})
    })

export default router;