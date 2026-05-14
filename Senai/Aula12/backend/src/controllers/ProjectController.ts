import { Request, Response} from 'express';
import Project from '../models/Project.ts';

class ProjectController {
    static async Post(req: Request, res: Response){
        const { title, xp, level, progress, status } = req.body
        const project = new Project({
            title: title, 
            xp: Number(xp),
            level: level,
            progress: progress,
            status: status,
        })
        project.save()
        return res.status(200).send({ response: "Projeto cadastrado com sucesso!"})
    }

    static async Get(req: Request, res: Response){
        const project = await Project.find()
        return res.status(200).send({ response: project})
    }

    static async Put(req: Request, res: Response){
        const project = req.body.project
        const { title, xp, level, progress, status } = req.body
        if (title) project.title = title
        if (xp) project.xp = xp
        if (level) project.level = level
        if (progress) project.progress = progress
        if (status) project.status = status

        await project.save()
        return res.status(200).send({message: "Projeto atualizado com sucesso"})
    }

    static async Delete(req: Request, res: Response){
        const { id } = req.params
        await Project.findByIdAndDelete(id)
        return res.status(200).send({ message: "Projeto deletado com sucesso" })
    }
}

export default ProjectController;