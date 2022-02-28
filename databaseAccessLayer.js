const database = include('/databaseConnection');

function addRestaurant(postData, callback) {
	let sqlInsertRestaurant = 'INSERT INTO restaurant (name, description) VALUES(:name, :description);';
	let params = {
		name: postData.name,
		description: postData.description
	};
	console.log(sqlInsertRestaurant);
	database.query(sqlInsertRestaurant, params, (err, results, fields) => {
		if (err) {
			console.log(err);
			callback(err, null);
		} else {
			console.log(results);
			callback(null, results);
		}
	});
};

function getAllRestaurants(callback) {
	let sqlQuery = 'SELECT restaurant_id, name, description FROM restaurant';
	database.query(sqlQuery, (err, results, fields) => {
		if (err) {
			callback(err, null);
		} else {
			console.log(results);
			callback(null, results);
		}
	});
};

function deleteRestaurant(restaurantId, callback) {
	let sqlDeleteRestaurant = 'DELETE FROM restaurant WHERE restaurant_id = :restaurantID';
	let params = {
		restaurantID: restaurantId
	};
	console.log(sqlDeleteRestaurant);
	database.query(sqlDeleteRestaurant, params, (err, results, fields) => {
		if (err) {
			callback(err, null);
		} else {
			console.log(results);
			callback(null, results);
		}
	});
};

function getRestaurantReviews(restaurantId, callback) {
	let sqlQuery = 'SELECT restaurant_id, review_id, reviewer_name, details, rating FROM review WHERE restaurant_id = :restaurantID';
	let params = {
		restaurantID: restaurantId
	}
	console.log(sqlQuery);
	database.query(sqlQuery, params, (err, results, fields) => {
		if (err) {
			callback(err, null);
		} else {
			console.log(results);
			callback(null, results);
		}
	});
};

function addReview(restaurantId, postData, callback) {
	let sqlInsertReview = 'INSERT INTO review (restaurant_id, reviewer_name, details, rating) VALUES(:restaurantID, :reviewerName, :details, :rating)';
	let params = {
		restaurantID: restaurantId,
		reviewerName: postData.reviewer_name,
		details: postData.details,
		rating: postData.rating
	};

	database.query(sqlInsertReview, params, (err, results, fields) => {
		if (err) {
			console.log(err);
			callback(err, null);
		} else {
			console.log(results);
			callback(null, results);
		}
	});
};

function deleteReview(reviewId, callback) {
	let sqlDeleteReview = 'DELETE FROM review WHERE review_id = :reviewID';
	let params = {
		reviewID: reviewId
	};

	console.log(sqlDeleteReview);
	
	database.query(sqlDeleteReview, params, (err, results, fields) => {
		if (err) {
			callback(err, null);
		} else {
			console.log(results);
			callback(null, results);
		}
	});
};

module.exports = { getAllRestaurants, addRestaurant, deleteRestaurant, getRestaurantReviews, addReview, deleteReview }
