'use strict'
const apiRoutes = require('../api/routes'),
  path = require('path'),
  express = require('express'),
  oneYear = 31557600000;


module.exports = (app) => {
  apiRoutes(app)
  
  // app.use((req, res, next) => {
    //   res.header("Content-Security-Policy", "default-src https://www.google-analytics.com https://*.gstatic.com https://*.googleapis.com 'self' data: 'unsafe-inline';");
    //   res.header("X-XSS-Protection", "1; mode=block");
    //   res.header("X-Content-Type-Options", "nosniff");
    //   res.header("Referer-Policy", "same-origin");
    // next()
  // })
  // Admin Routes
  app.use('/admin', express.static(path.join(__dirname, '/../build/admin')))
  
  // Client Routes 
  app.use(express.static(path.join(__dirname, '/../build/client')))
  app.use('/menu', express.static(path.join(__dirname, '/../build/client')))
  app.use('/events', express.static(path.join(__dirname, '/../build/client')))
  app.use('/about', express.static(path.join(__dirname, '/../build/client')))
  app.use('*', express.static(path.join(__dirname, '/../build/client'))) 
}
