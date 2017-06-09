'use strict';
module.exports = function(app){
	const loginRequired = require('./middleware/loginRequired');


	let loginRouter = require('./routes/login');
	app.use('/',loginRouter);
	
	let indexRouter = require('./routes/index');
	app.use('/home',loginRequired,indexRouter);


	let dataRouter = require('./routes/data');
	app.use('/data',dataRouter);
}