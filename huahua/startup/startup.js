var express = require('express')
var http = require('http');
var path = require('path')
var api = require('../data/api')
var router = require('./router')
var favicon = require('serve-favicon')
var ejs = require('ejs')
var port = process.env.PORT || 3340

var app = express()

var log4js = require('log4js')


app.set('views', path.resolve(__dirname, '../dist'))
app.engine('.html',ejs.__express)
app.set('view engine', 'html')

app.use(express.static(path.resolve(__dirname, '../dist')))

/*
log4
*/
log4js.configure(path.join(__dirname,'log4.conf.json'))



app.use('/', router)
app.use('/data', api)

app.use(favicon(path.resolve(__dirname, '../static', 'favicon.ico')))

var server = http.createServer(app)

server.listen(port)

server.on('listening', ()=>{
	  var addr = server.address();
	  var bind = typeof addr === 'string'
	    ? 'pipe ' + addr
	    : 'port ' + addr.port;
	  console.log('Listening on ' + bind);
})

