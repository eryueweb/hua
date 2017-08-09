var express = require('express')
var path = require('path')
var api = require('../data/api')
var favicon = require('serve-favicon')

var app = express()

app.use('/data', api)
app.use(favicon(path.resolve(__dirname, '../static', 'favicon.ico')))

module.exports = app;