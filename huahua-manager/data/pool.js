'use strict';
let mysql = require('mysql');
let	$mysqlConfig = require('./mysql.config.js');
//创建连接池
let pool = mysql.createPool($mysqlConfig.db);

module.exports = pool;
