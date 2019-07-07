const {red, green, blue, yellow } = require('chalk')
const { db } = require('./db')
const app = require('../server')

const port = process.env.PORT || 8080

db.sync({ force: true })
  .then(() => {
    console.log(green('DB sync\'d!!'))

    app.listen(port, () => console.log(blue(`Serving it up happy hour style...

    http://localhost:${port}
    `)))
  })
