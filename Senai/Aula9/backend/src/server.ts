import express from 'express';
import route from './routes/routes.ts'
import connectDB from './database/database.ts';
import cors from 'cors'

const router = express.Router()
const app = express();
const port = 8080;
app.use (cors({
    origin: '*'
}))

connectDB()
route(app)

app.get('/',(req, res) => {
    res.status(200).send({response: "API funcionando"})
});

app.listen(port, () => {
    console.log(`Servidor modulando na porta: ${port}`)
});