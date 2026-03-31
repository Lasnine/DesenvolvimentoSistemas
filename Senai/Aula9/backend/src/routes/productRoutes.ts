import express, { Router } from 'express';
import UserController from '../controllers/ProductController.ts';
import { validateRegister, validation } from '../middlewares/ProductMiddleware.ts'
const router: Router = express.Router();


router.post('/registrar', validateRegister, UserController.Post);
router.get('/', UserController.Get);
router.get('/:id', validation, UserController.GetID);
router.put('/atualizar/:id', validation,UserController.Put);
router.delete('/delete/:id', UserController.Delete);

export default router;