import express from 'express';
import route from './routes/routes.ts'
import connectDB from './database/database.ts';
import UserController from './controllers/userControllers.ts';

const router = express.Router()
const app = express();
const port = 8080;
connectDB()
route(app)

router.get("/users", UserController.getUsers);
router.post("/users", UserController.createUser);

app.get('/',(req, res) => {
    res.status(200).send({response: "API funcionando"})
});

app.listen(port, () => {
    console.log(`Servidor modulando na porta: ${port}`)
});