const express = require('express')
const path = require('path')
const app = express()
module.exports = app

// ALL middleware
app.use(require('./middleware'))

// api routes
app.use('/api', require('./api'))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'))
}) // send index.html for any other req's

// error handling middleware
app.use((err, req, res, next) => {
  console.error(err)
  console.error(err.stack)
  res.status(err.status || 500).send(err.message || 'Internal server error.')
})
