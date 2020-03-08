// require dependencies
const PORT = process.env.PORT || 8000
const express = require('express')
const fs = require('fs')
const path = require('path')
const app = express()

// write to the database 
const writeData = function () {
  fs.writeFile('./Develop/db/db.json', JSON.stringify(data), err => {
    if (err) throw err
  })
}

// data is defined as db.json file
let data = JSON.parse(fs.readFileSync('./Develop/db/db.json', 'utf8'))
console.log(data)

// express server code
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// stores /Develop information on the server
app.use(express.static('./Develop/public'))

// get route for html on homepage
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, './Develop/public/index.html'))
})

// get route for html on notes app
app.get('/notes', function (req, res) {
  res.sendFile(path.join(__dirname, './Develop/public/notes.html'))
})

// post route that posts notes to the db
app.post('/api/notes', function (req, res) {
  data.push(req.body)
  console.log(data)
  writeData()
  return res.json(data)
})

// get route for retreiving note information
app.get('/api/notes', function (req, res) {
  return res.json(data)
})

// delete route that removes notes based on id
app.delete('/api/notes/:id', function (req, res) {
  const id = req.params.id
  data = data.filter(function (note) {
    if (note.id === id) {
      return false
    }
    return true
  })
  writeData()
  return res.json(data)
})

app.listen(PORT, function () {
  console.log('Server is listening on: ', PORT)
})
