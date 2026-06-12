import { prisma }  from '../lib/prisma'
import { regTicket, upTicket } from '../dtos/ticketDTO'

export const createTicket = async(data: regTicket) => {
    const { title, description, sector, priority } = data
    await prisma.ticket.create({
        data: {
            title, 
            description, 
            sector,
            priority,
            status: "Aberto"
        }
    })
}
export const showTickets = async() => {
    return await prisma.ticket.findMany()
}
export const showTicketById = async(id: number) => {
    return await prisma.ticket.showById({
        where:{
            id:id
        }
    })
}
export const updateTicket = async(id: number, data: upTicket) => {
    const { title, description, sector, priority, status } = data
    return await prisma.ticket.update({
        where:{
            id:id
        },
        data:{
            title,
            description,
            sector,
            priority,
            status: "Aberto" || "Em_Andamento" || "Finalizado"
        }
    })
}
export const deleteTicket = async(id: number) => {
    return await prisma.ticket.delete({
        where:{
            id:id
        }
    })
}
export const startTicket = async(id: number) => {
    return await prisma.ticket.start({
        where:{
            id:id
        }
    })

}
export const finishTicket = async(id: number) => {
    return await prisma.ticket.finish({
        where:{
            id:id
        }
    })
}