
var user = {
	add: 'insert into users set ?',
	delete: 'delete from users where name="Kitty"',
	update: 'update users set name=?,sex=?,age=?,email=? where userId=?',
	search: 'select * from users'
};
module.exports = user;