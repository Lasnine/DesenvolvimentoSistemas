import { NextFunction, Request, Response} from "express";

export const validateCreate = (req: Request, res: Response, next: NextFunction)=>{
    const { title, description, sector, priority, status } = req.body;
    if(!title || !description)
    {
        return res.status(400).json({ error: "Título e descrição são obrigatórios" });
    }
    next();
}
export const validateUpdate = (req: Request, res: Response, next: NextFunction)=>{
    const { status } = req.body;
    if(status == "Finalizado"){
        return res.status(403).json({ error: "Operação não permitida" });
    }
}
export const validateDelete = (req: Request, res: Response, next: NextFunction)=>{
    const { status } = req.body;
    if(status == "Finalizado"){
        return res.status(403).json({ error: "Operação não permitida" });
    }
}