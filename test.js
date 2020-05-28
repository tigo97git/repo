const express = require('express');
const app = express();
const mysql = require('mysql');

const db = mysql.createConnection({
	database: 'database',
	host: "localhost",
	user: "root",
	password: "root"
});
db.connect(function (error) {
	if (error) {
		return console.log("error");
	} else {
		console.log("Connected!");
	}
});


app.post('/user', (req, res) => {
	const data = [];
	req.on('data', (chunk) => {
		data.push(chunk);
	});
	req.on('end', () => {
		const body = JSON.parse(Buffer.concat(data).toString());
		db.query('INSERT INTO user SET ?', body, (error, result) => {
			if (error) { res.send(error); }
			res.send(`User registered successfully`);
		});
	});
});


app.listen(8080);
console.log("listen on port : 8080");
