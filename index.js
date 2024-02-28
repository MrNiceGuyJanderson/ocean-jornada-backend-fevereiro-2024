require('dotenv').config()
const express = require('express')
const { MongoClient, ObjectId } = require('mongodb')

//string de conexão com mongodb
const dbUrl = process.env.DATABASE_URL;
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

  //lista de personagens
  const lista = ["Rick Sanchez", "Morty Smith", "Summer Smith"]

  //conectar a base de dados
  const db = client.db(dbName)
  //Pega a collection
  const collection = db.collection('items')

  //Read All -> [GET] /item
  app.get('/item', async function (req, res) {
    const items = await collection.find().toArray()
    res.send(items)
  })

  //Read by ID -> [GET] /item/:id
  app.get('/item/:id', async function (req, res) {
    const id = req.params.id

    const item = await collection.findOne({
      _id : new ObjectId(id)
    })

    if (!item)
      return res.status(404).send("Nenhum registro encontrado")

    res.status(200).send(item)
  })

  //CREATE -> [POST] /item
  app.post('/item', async function (req, res) {
    const item  = req.body;
  
    await collection.insertOne(item);
    res.status(200).send(item);
  })

   //UPDATE -> [PUT] /item
   app.put('/item/:id', async function (req, res) {

    const id =  req.params.id
    const novoItem  = req.body;
  
    await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: novoItem }
   )
    res.status(200).send('Item atualizado com sucesso.');
  })

  //DELETE -> [DELETE] /item
  app.delete('/item/:id', async function (req, res) {

    const id =  req.params.id
  
    await collection.deleteOne(
      { _id: new ObjectId(id) }
   )
    res.status(200).send('Item excluído com sucesso.');
  })

  app.listen(3000)

}

main()