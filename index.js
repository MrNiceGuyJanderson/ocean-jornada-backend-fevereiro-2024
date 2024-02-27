const express = require('express')
const { MongoClient } = require('mongodb')

//string de conexão com mongodb
const dbUrl = 'mongodb+srv://jscarmo2007:FNgnQRGmpfvqoFiQ@cluster0.ahk93og.mongodb.net/'
//Nome da collection
const dbName = 'OceanJornadaBackEndFev2024'

async function main() {
  //cria instancia do mongoclient
  const client = new MongoClient(dbUrl)

  console.log('Conetando ao banco de dados...')
  await client.connect()
  console.log('Banco de dados conectado com sucesso.')

  const app = express()

  app.use(express.urlencoded({ extended: false }))
  app.use(express.json())

  app.get('/', function (req, res) {
    res.send('Curso backend de node com express')
  })

  app.get('/oi', function (req, res) {
    res.send("Olá mundo!!")
  })

  //lista de personagens
  const lista = ["Rick Sanchez", "Morty Smith", "Summer Smith"]

  //Read All -> [GET] /item
  app.get('/item', function (req, res) {
    res.send(lista)
  })

  //Read by ID -> [GET] /item/:id
  app.get('/item/:id', function (req, res) {
    const id = req.params.id
    res.send(lista[id])
  })

  //CREATE -> [POST] /item
  app.post('/item', function (req, res) {
    const { nome } = req.body
    lista.push(nome)
    res.send(lista)
  })

  app.listen(3000)

}

main()