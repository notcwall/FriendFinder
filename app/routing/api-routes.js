var path = require('path');

var friends = require('../data/friends.js');

function compareScores(inputUser){
	var lowestDifference = 40;
	var currentDifference = 0;
	var bestMatch;

	for(var i = 0; i < friends.length; i++){
		if(inputUser.name != friends[i].name){
			for(var j = 0; j < 10; j++){
				currentDifference += Math.abs(parseInt(inputUser.scores[j]) - parseInt(friends[i].scores[j]));
			}
			if(currentDifference <= lowestDifference){
				lowestDifference = currentDifference;
				bestMatch = friends[i];
			}
			currentDifference = 0;
		}
	}

	return bestMatch;
}

module.exports = function(app){
	app.get('/api/friends', function(req, res){
		res.json(friends);
	});

	app.post('/api/friends', function(req, res){
		friends.push(req.body);
		res.send(compareScores(req.body));
	});
}