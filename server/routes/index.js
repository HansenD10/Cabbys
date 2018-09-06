'use strict'
let apiRoutes = require('../api/routes')

module.exports = (app) => {
  apiRoutes(app)

  //Route to client
  app.get(['/', '/about', '/events', '/menu'], (req,res) => {
    res.sendFile(path.join(__dirname, '/build/client/index.html'))
  })

  //Route to admin
  app.get(['/admin'], (req,res) => {
    res.sendFile(path.join(__dirname, '/build/admin/index.html'))
  })
}