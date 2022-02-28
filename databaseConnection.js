const mysql = require('mysql2');

const is_heroku = process.env.IS_HEROKU || false;

const dbConfigHeroku = {
	host: "vkh7buea61avxg07.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
	user: "a5bo4mlmtu9bdcct",
	password: "rdf8jw9lidqm4713",
	database: "jugv3m5awn9160ez",
	multipleStatements: false,
	namedPlaceholders: true,
	reconnect: true
};

const dbConfigLocal = {
	host: "localhost",
	user: "root",
	password: "X58F+,aa}&S/|kS?",
	database: "restaurants_reviews",
	multipleStatements: false,
	namedPlaceholders: true
};

if (is_heroku) {
	var database = mysql.createPool(dbConfigHeroku);
} else {
	var database = mysql.createPool(dbConfigLocal);
}

module.exports = database;
		