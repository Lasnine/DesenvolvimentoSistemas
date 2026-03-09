import express, { Router } from 'express';
import UserController from '../controllers/ProductController.ts';
import { validateRegister, validation } from '../middlewares/ProductMiddleware.ts'
const router: Router = express.Router();


router.post('/registrar', validateRegister, UserController.Post);
router.get('/visualizar', UserController.Get);
router.get('/visualizar/:id', validation, UserController.GetID);
router.put('/atualizar/:id', validation,UserController.Put);
router.delete('/deletar/:id', validation, UserController.Delete);

export default router;