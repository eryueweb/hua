'use strict';
let mysql = require('mysql');
let	$mysqlConfig = require('./mysqlConfig');
//创建连接池
let pool = mysql.createPool($mysqlConfig.db);

module.exports = pool;