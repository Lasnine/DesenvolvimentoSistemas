import express from 'express';

const app = express();
const port = 8080;
const pessoa = {
    name: 'Lasnine',
    lastname: 'Santos',
    age: 18
}

const pessoas = 
app.get('/objeto', (req, res) => {  //forma correta
    res.send({pessoa: pessoa});
});

app.get('/diverto', (req, res) => {
    res.send({pessoa});
});

app.get('/', (req, res) => {
    res.send({response: 'API funcionando'});
});

app.listen(port, () => {
    console.log(`Servidor modulando na porta: ${port}`)
});