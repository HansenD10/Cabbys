'use strict'
let apiRoutes = require('../api/routes'),
  path = require('path'),
  express = require('express')

module.exports = (app) => {
  apiRoutes(app)

  // Client Routes
  app.use(express.static(path.join(__dirname, '/../build/client')))
  app.use('/menu', express.static(path.join(__dirname, '/../build/client')))
  app.use('/events', express.static(path.join(__dirname, '/../build/client')))
  app.use('/about', express.static(path.join(__dirname, '/../build/client')))

  // Admin Routes
  app.use('/admin', express.static(path.join(__dirname, '/../build/admin')))
  app.use('/admin/login', express.static(path.join(__dirname, '/../build/admin')))

}
