const router = require('express').Router();
const database = include('databaseConnection');
const dbModel = include('databaseAccessLayer');
//const dbModel = include('staticData');

router.get('/', (req, res) => {
	console.log("page hit");
	database.getConnection(function(err, dbConnection) {
		if (err) {
			res.render('error', {message: 'Error connecting to MySQL'});
			console.log("Error connecting to mysql");
			console.log(err);
		} else {
			dbModel.getAllRestaurants((err, result) => {
				if (err) {
					res.render('error', {message: 'Error reading from MySQL'});
					console.log("Error reading from mysql");
					console.log(err);
				} else { //success
					res.render('index', {allRestaurants: result});

					//Output the results of the query to the Heroku Logs
					console.log(result);
				}
				
			});
			dbConnection.release();
		}

	});

});

router.post('/addRestaurant', (req, res) => {
	console.log("form submit");
	database.getConnection(function (err, dbConnection) {
		if (err) {
			res.render('error', { message: 'Error connecting to MySQL' });
			console.log("Error connecting to mysql");
			console.log(err);
		} else {
			console.log(req.body);
			dbModel.addRestaurant(req.body, (err, result) => {
				if (err) {
					res.render('error', { message: 'Error writing to MySQL' });
					console.log("Error writing to mysql");
					console.log(err);
				} else { //success
					res.redirect("/");
					//Output the results of the query to the Heroku Logs
					console.log(result);
				}

			});
			dbConnection.release();
		}

	});
});

router.get('/deleteRestaurant', (req, res) => {
	console.log("delete restaurant");
	database.getConnection(function (err, dbConnection) {
		if (err) {
			res.render('error', { message: 'Error connecting to MySQL' });
			console.log("Error connecting to mysql");
			console.log(err);
		} else {
			console.log(req.query);
			let restaurantId = req.query.id;
			if (restaurantId) {
				dbModel.deleteRestaurant(restaurantId, (err, result) => {
					if (err) {
						res.render('error', { message: 'Error writing to MySQL' });
						console.log("Error writing to mysql");
						console.log(err);
					} else { //success
						res.redirect("/");
						//Output the results of the query to the Heroku Logs
						console.log(result);
					}

				});

			} else {
				res.render('error', { message: 'Error on Delete' });
			}

			dbConnection.release();
		}

	});
});

router.get('/showReviews', (req, res) => {
	console.log('show reviews');
	console.log(req.query);
	
	database.getConnection(function(err, dbConnection) {
		if (err) {
			res.render('error', {message: 'Error connecting to MySQL'});
			console.log("Error connecting to mysql");
			console.log(err);
		} else {
			console.log(req.query);
			let restaurantId = req.query.id;
			let restaurantName = req.query.restaurant;
			if (restaurantId) {
				dbModel.getRestaurantReviews(restaurantId, (err, result) => {
					if (err) {
						res.render('error', {message: 'Error reading from MySQL'});
						console.log("Error reading from mysql");
						console.log(err);
					} else { //success
						res.render('reviews', {restaurantName, restaurantId, allReviews: result});
	
						//Output the results of the query to the Heroku Logs
						console.log(result);
					}
					
				});
			} else {
				res.render('error', { message: 'Error on req.query' });
			}
			
			dbConnection.release();
		}
	});
});

router.post('/addReview', (req, res) => {
	console.log('form submit');
	console.log(req.query);
	if (req.query.id) {
		database.getConnection(function (err, dbConnection) {
			if (err) {
				res.render('error', { message: 'Error connecting to MySQL' });
				console.log("Error connecting to mysql");
				console.log(err);
			} else {
				console.log(req.body);
				dbModel.addReview(req.query.id, req.body, (err, result) => {
					if (err) {
						res.render('error', { message: 'Error writing to MySQL' });
						console.log("Error writing to mysql");
						console.log(err);
					} else {
						res.redirect(`/showReviews?id=${req.query.id}&restaurant=${req.query.restaurant}`);
					}
				});
			}
		});
	}
	
});

router.get('/deleteReview', (req, res) => {
	console.log("delete review");
	database.getConnection(function (err, dbConnection) {
		if (err) {
			res.render('error', { message: 'Error connecting to MySQL' });
			console.log("Error connecting to mysql");
			console.log(err);
		} else {
			console.log(req.query);
			let reviewId = req.query.id;
			if (reviewId) {
				dbModel.deleteReview(reviewId, (err, result) => {
					if (err) {
						res.render('error', { message: 'Error writing to MySQL' });
						console.log("Error writing to mysql");
						console.log(err);
					} else { //success
						res.redirect(`/`);
						//Output the results of the query to the Heroku Logs
						console.log(result);
					}

				});
			} else {
				res.render('error', { message: 'Error on Delete' });
			}

			dbConnection.release();
		}

	});
});

module.exports = router;
