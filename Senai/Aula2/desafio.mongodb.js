use("Telefone")

let contatos = ([
  {
    nome: "Ana Silva",
    telefone: "999912345",
    email: "ana.silva@gmail.com",
    cidade: "São Paulo",
    dataCadastro: new Date("2023-02-10")
  },
  {
    nome: "Bruno Costa",
    telefone: "41987654321",
    email: "bruno.costa@hotmail.com",
    cidade: "Curitiba",
    dataCadastro: new Date("2022-11-05")
  },
  {
    nome: "Amanda Souza",
    telefone: "988776655",
    email: "amanda.souza@gmail.com",
    cidade: "Rio de Janeiro",
    dataCadastro: new Date("2024-01-15")
  },
  {
    nome: "Carlos Pereira",
    telefone: "41911223344",
    email: "carlos@empresa.com",
    cidade: "Curitiba",
    dataCadastro: new Date("2023-06-20")
  },
  {
    nome: "Daniel Rocha",
    telefone: "977665544",
    email: "daniel.rocha@gmail.com",
    cidade: "São Paulo",
    dataCadastro: new Date("2021-09-30")
  }
])

db.contato.insertMany(contatos)

//1) Busca:
use("Telefone")
db.contato.find({nome: /^a/i})

//2) Busca:
use("Telefone")
db.contato.find({telefone: /^9/})

//3) Busca:
use("Telefone")
db.contato.find({email: /@gmail.com/})

//4) Busca:
use("Telefone")
db.contato.find({cidade: /São Paulo/})

//5) Busca:
use("Telefone")
db.contato.find({dataCadastro: new ISODate("2023-01-01T00:00:00Z")})

//1.1) Atualizar:
//1.2) Atualizar:
//1.3) Atualizar:

//1.4.1) Deletar:
//1.4.2) Deletar: