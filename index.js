var app = require('express').createServer();
var APP_NAME = 'soft_daren';
var APP_PORT = 3000;

app.set('view engine', 'ejs');
app.set('view options', {
	layout: false
});

/*

首页：/
类别列表：/category_list
类别数据：/category_list/json

*/

app.get('/', function (req, res) {
	console.log('hello welcome '+APP_NAME);
	var json_data = {
		user: {name: 'ne'},
		category_list: [
		{name: '最新更新',soft_count: 50},
		{name: '全部软件',soft_count: 11604},
		{name: '视频软件',soft_count: 565},
		{name: '浏览器',soft_count: 66}
			]
		};
	res.render('index', json_data);
});
//标记处理格式，如果是format=json,则后续渲染模板时，走特殊处理流程。

/*
app.param('format', function (req, res, next, $1) {
	console.log('[format] parse: $1='+$1);
	console.log('[params] parse: format='+req.params.format);
	if(format) {
		req.params.format = format;
	}
	next();
});
var ItemProvider = require('ItemProvider');
var itemProvider = new ItemProvider('localhost', 27017);
*/
// #D:\>mongod --dbpath D:/MongoDB/data
var mongodb = require('mongodb');
function getCategoryList() {
	var server = new mongodb.Server('localhost', 27017),
		connection = new mongodb.Db('test', server);
	
	connection.open(function (err, db) {
		if(err) {
			console.log(err);
			return ;
		}
		db.collection('books', function(err, collection) {
			collection.find(function (err, cursor) {
				cursor.each(function (err, doc) {
					if(doc) {
						console.log('doc.title'+doc.title);
					}
				});
			});
		});
	});
	return {};
}
function addCategoryList() {

}
app.get('/test', function (req, res ){
	var json_data = getCategoryList();
	res.render('json', {json_data: json_data});
});
app.get('/category_list/?:format?', function (req, res, next) {
	console.log('hello welcome '+APP_NAME+'//category_list(/:format)');
	var json_data = {
		user: {name: 'ne'},
		category_list: [
		{name: '最新更新',soft_count: 50},
		{name: '全部软件',soft_count: 11604},
		{name: '视频软件',soft_count: 565},
		{name: '浏览器',soft_count: 66}
			]
		};
	if(req.params.format === 'json') {
		res.render('json', {json_data: json_data});
		console.log('render JSON');
	} else {
		res.render('index', json_data);
	}
});

app.listen(3000);
console.log(APP_NAME + ' SERVER start at:' + APP_PORT);