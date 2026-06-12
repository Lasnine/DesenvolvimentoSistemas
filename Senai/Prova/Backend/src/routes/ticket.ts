import express from 'express';
import TicketController from '../controllers/TicketController';
import { validateCreate, validateDelete, validateUpdate } from '../middlewares/ticketMiddlewares';

const route = express.Router();
    route
    .post('/create', TicketController.create, validateCreate)
    .get('/show', TicketController.show)
    .get('/show/:id', TicketController.showById)
    .put('/update/:id', TicketController.update, validateUpdate)
    .delete('/delete/:id', TicketController.delete, validateDelete)
    route.patch('/start/:id', TicketController.start)
    route.patch('/finish/:id', TicketController.finish)

export default route;