import { Request, response, Response } from "express";
import { regTicket, upTicket } from "../dtos/ticketDTO";
import { createTicket, showTickets, showTicketById, updateTicket, deleteTicket, startTicket } from "../services/ticket.service"

export default class TicketController {
    static async create(req: Request, res: Response){
        const data: regTicket = req.body
        try{
            await createTicket(data)
            return res.status(200).send({ response: "Ticket criado" })
        }
        catch(e){
            return res.status(404).send({ response: e instanceof Error ? e.message : e })
        }
    }
    static async show(req: Request, res: Response){
        try{
            const ticket = await showTickets()
            return res.status(200).send({ response: {ticket}})
        }
        catch(e){
            return res.status(404).send({ response: "Ticket não encontrado" })
        }
    }
    static async showById(req: Request, res: Response){
        const {id} = req.params
        try{
            const ticket = await showTicketById(Number(id))
            return res.status(200).send({ response: {ticket}})
        }
        catch(e){
            return res.status(404).send({ response: "Ticket não encontrado" })
        }
    }
    static async update(req: Request, res: Response){
        const {id} = req.params
        const data: upTicket = req.body
        try{
            await updateTicket(Number(id), data)
            return res.status(200).send({ response: "Atualizado"})
        }
        catch(e){
            return res.status(404).send({ response: "Ticket não encontrado" })
        }
    }
    static async delete(req: Request, res: Response){
        const {id} = req.params
        const data: upTicket = req.body
        try{
            await deleteTicket(Number(id))
            return res.status(200).send({ response: "Deletado"})
           
        }
        catch(e){
            return res.status(404).send({ response: "Ticket não encontrado" })
        }
    }
    static async start(req: Request, res: Response){
        const {id} = req.params
        const data: upTicket = req.body
        try{
            if(data.status == "Aberto"){
                await startTicket(Number(id))
                data.status = "Em_Andamento"
                return res.status(200).send({ response: "Atualizado"})
            }
            return res.status(403).send({ response: "Apenas status aberto" })
        }
        catch(e){
            return res.status(404).send({ response: "Ticket não encontrado" })
        }

    }
    static async finish(req: Request, res: Response){
        const {id} = req.params
        const data: upTicket = req.body
        try{
            if(data.status == "Em_Andamento"){
                await startTicket(Number(id))
                data.status = "Finalizado"
                return res.status(200).send({ response: "Atualizado"})
            }
            return res.status(403).send({ response: "Apenas status em_andamento" })
        }
        catch(e){
            return res.status(404).send({ response: "Ticket não encontrado" })
        }
    }
}

   
 