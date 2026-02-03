// show database

use("Bosch")

let pessoa = ([
    {
        name: "Lasnine",
        lastname: "Santos",
        age: 18,
        salary: 8.500
    },
    {
        name: "Anna",
        lastname: "Guerra",
        age: 20,
        salary: 15.000 
    },
    {
        name: "Leticia",
        lastname: "Burlinski",
        age: 19,
        salary: 9.200 
    },
    {
        name: "Nicolas",
        lastname: "Marques",
        age: 22,
        salary: 2.500 
    },
    {
        name: "Leonardo",
        lastname: "Trevis",
        age: 26,
        salary: 80.000 
    },
    {
        name: "Patroques",
        lastname: "Bigodex",
        age: 25,
        salary: 3.000 
    },
    {
        name: "Fabio",
        lastname: "Silveira",
        age: 53,
        salary: 26.000 
    },
    {
        name: "Queila",
        lastname: "Lima",
        age: 26,
        salary: 8.000 
    },
    {
        name: "Eduado",
        lastname: "Marcomini",
        age: 33,
        salary: 12.000 
    },
    {
        name: "Dirceu",
        lastname: "Puehler",
        age: 48,
        salary: 35.000 
    }
]) 
db.people.insertMany(pessoa)

use("Bosch")
db.people.find() //busca todos os dados do bd

use("Bosch")
db.people.find({name: "Dirceu"}) //O parametro para buscar algo em especifico

use("Bosch")
db.people.find({name: /n/}) //Buscar qualquer pessoa quem tem N no nome

use("Bosch")
db.people.find({name: /^L.*e$/}) //Busca pessoa que começa com L e termina com E

use("Bosch")
db.people.find({ $and: [{ name: 'Nicolas' }, { lastname: 'Marques' }] }) //Buscar pessoa especifica

use("Bosch")
db.people.find({ salary: { $gt: 20 } }) //Busca qualquer pessoa com o salario acima de 20

use("Bosch")
db.people.find({salary: {$gte: 30}}, {name: 1, lastname: 1}) //Tras todos os nomes e sobrenome em que o salario é acima de 30

use("Bosch")
db.people.updateOne(
    { _id: ObjectId('6981f25656fb04538ae4f771') },
    { $set:{ name:"Las9" }}
); //Altera o nome da pessoa

use("Bosch")
db.people.updateMany(
    { salary: 8 },
    { $set:{ salary:12 }}
); //Atualiza todos que tem o salario 8

use("Bosch")
db.people.deleteOne({ name: /Fabio/ }) //Deleta todos que tem o nome "Fabio"

use("Bosch")
db.people.deleteMany({ name: /n/ })//Deleta todos que tem "N" no nome