import { Request, Response, NextFunction } from 'express';
import Project from '../models/Project.ts';

export const validateProject = async (req: Request, res: Response, next: NextFunction) => {
    const { title, level, status } = req.body
    if (!title || !level || !status ){
        return res.status(400).send({ response: "title, level and status is required!"})
    }
    next();
}

export const validation = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
        const project = await Project.findById(id);
        if (!project) {
            return res.status(404).send("Projeto não encontrado");
        }
        req.body.project = project; 
        next();
    } 
    catch (error) {
        return res.status(500).send("Erro ao buscar projeto");
    }
}