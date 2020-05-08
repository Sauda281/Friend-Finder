var friends = require('../data/friends.js');

module.exports = function(app) {
    app.get("/api/friends", function(req, res) {
      res.json(friends);
    });
  
    app.post("/api/friends", function(req, res) {
      var totalDifference = 0;
  
      var bestMatch = {
        name: "",
        photo: "",
        friendDifference: 1000
      };
  
      // take the result of the user"s survey POST and parse it.
      var userData = req.body;
      var userName = userData.name;
      var userScores = userData.scores;
  
      var b = userScores.map(function(item) {
        return parseInt(item, 10);
      });
      userData = {
        name: req.body.name,
        photo: req.body.photo,
        scores: b
      };
  
      console.log("Name: " + userName);
      console.log("User Score " + userScores);
  
      // This variable will calculate the difference between the user"s scores and the scores of
    // each user in the database
      var sum = b.reduce((a, b) => a + b, 0);
  
      console.log("Sum of users score " + sum);
      console.log("Best match friend diff " + bestMatch.friendDifference);
      console.log("+++++++=================++++++++++");
  
      
    //   loop through all the scores of each friend
      for (var i = 0; i < friends.length; i++) {
        console.log(friends[i].name);
        totalDifference = 0;
        console.log("Total Diff " + totalDifference);
        console.log("Best match friend diff " + bestMatch.friendDifference);
  
        var bfriendScore = friends[i].scores.reduce((a, b) => a + b, 0);
        console.log("Total friend score " + bfriendScore);
        totalDifference += Math.abs(sum - bfriendScore);
        console.log("-------------------------> " + totalDifference);
  
        if (totalDifference <= bestMatch.friendDifference) {
          bestMatch.name = friends[i].name;
          bestMatch.photo = friends[i].photo;
          bestMatch.friendDifference = totalDifference;
        }
        console.log(totalDifference + " Total Difference");
      }
      console.log(bestMatch);
  
    //   Finally save the user's data to the database (this has to happen AFTER the check. otherwise,
        // the database will always return that the user is the user's best friend).
      friends.push(userData);
      console.log("New user added");
      console.log(userData);

      // Return a JSON with the user's bestMatch. This will be used by the HTML in the next page
      res.json(bestMatch);
    });
  };
