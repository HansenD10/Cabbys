'use strict'
let apiRoutes = require('../api/routes'),
  path = require('path'),
  express = require('express')

module.exports = (app) => {
  apiRoutes(app)

  // Admin Routes
  app.use('/admin/login', express.static(path.join(__dirname, '/../build/admin')))
  app.use('/admin', express.static(path.join(__dirname, '/../build/admin')))
  
  // Client Routes 
  app.use('*', express.static(path.join(__dirname, '/../build/client')))

}
