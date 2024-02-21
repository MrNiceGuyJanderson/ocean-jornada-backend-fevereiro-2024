const express = require('express')
const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.get('/', function (req, res) {
  res.send('Curso backend de node com express')
})

app.get('/oi', function (req, res){
    res.send("Olá mundo!!")
})

//lista de personagens
const lista = ["Rick Sanchez", "Morty Smith", "Summer Smith"]

//Read All -> [GET] /item
app.get('/item', function (req, res){
    res.send(lista)
})

//Read by ID -> [GET] /item/:id
app.get('/item/:id', function (req, res){
  const id = req.params.id
  res.send(lista[id])
})

//post
app.post('/item', function(req, res){
  const {nome} = req.body
  lista.push(nome)
  res.send(lista)
})

app.listen(3000)