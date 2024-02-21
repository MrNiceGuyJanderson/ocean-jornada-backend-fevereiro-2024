const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Curso backend de node com express')
})

app.get('/oi', function (req, res){
    res.send("Olá mundo!!")
})

//lista de personagens
const lista = ["Rick Sanchez", "Morty Smith", "Summer Smith"]

app.get('/item', function (req, res){
    res.send(lista)
})

app.listen(3000)