import express, { Router } from 'express';
import UserController from '../controllers/ProductController.ts';
import { validateRegister, validation } from '../middlewares/ProductMiddleware.ts'
const router: Router = express.Router();


router.post('/registrar', validateRegister, UserController.Post);
router.get('/bar', UserController.Get);
router.get('/bar/:id', validation, UserController.GetID);
router.put('/bar/:id', validation,UserController.Put);
router.delete('/bar/:id', validation, UserController.Delete);

export default router;