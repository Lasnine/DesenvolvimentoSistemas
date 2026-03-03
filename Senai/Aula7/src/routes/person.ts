import express, { Request, Response, Router } from 'express';
import Person from '../models/person.ts';

const router: Router = express.Router();

router
    .post('/registrar', async (req: Request, res: Response) =>{
        const { name, lastname, age } = req.body;
        const person = new Person({name, lastname, age});
        await person.save()
        res.status(201).send({message: `Bem vindo(a) ${name}! Cadastro realizado com sucesso.`})
    })

    .get('/usuarios', async (req: Request, res: Response) => {
        try{
            const people = await Person.find();
            res.status(200).json(people);
        } 
        catch (error){
            res.status(400).json({ message: 'Erro ao buscar pessoas', error });
        }
    })

    .put('/atualizar/:id', async (req: Request, res: Response) => {
        const { id } = req.params;
        const { name, lastname, age } = req.body;

        try {
            const person = await Person.findByIdAndUpdate(id, { name, lastname, age });
            if (!person) {
                res.status(404).json({ message: 'Pessoa não encontrada' });
            }
            res.status(200).json(Person)
        } 
        catch (error) {
            res.status(400).json({ message: 'Erro ao atualizar pessoa', error });
        }
    })
    
    .delete('/deletar/:id', async (req: Request, res: Response) => {
        const { id } = req.params
        try {
            const person = await Person.findByIdAndDelete(id);
            if (!person) {
            res.status(404).json({ message: 'Pessoa não encontrada' });
            }
            res.status(200).json({ message: 'Pessoa deletada com sucesso' });
        } 
        catch (error) {
            res.status(400).json({ message: 'Erro ao deletar pessoa', error });
        }
    })

export default router;