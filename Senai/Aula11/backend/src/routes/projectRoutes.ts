import express, { Router } from 'express';
import ProjectController from '../controllers/ProjectController.ts';
import { validateProject, validation } from '../middlewares/ProjectMiddleware.ts';

const router: Router = express.Router();

router.post('/registrar', validateProject, ProjectController.Post);
router.get('/', ProjectController.Get);
router.get('/:id', validation, ProjectController.Get);
router.put('/atualizar/:id', validation, ProjectController.Put);
router.delete('/delete/:id', ProjectController.Delete);

export default router;