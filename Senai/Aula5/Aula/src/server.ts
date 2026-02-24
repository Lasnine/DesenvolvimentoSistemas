import express from 'express';
import route from './routes/routes.ts'

const app = express();
const port = 8080;
route(app)

app.get('/',(req, res) => {
    res.status(200).send({response: "API funcionando"})
});

app.listen(port, () => {
    console.log(`Servidor modulando na porta: ${port}`)
});