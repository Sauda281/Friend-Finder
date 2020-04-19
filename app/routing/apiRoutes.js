var friends = require('../data/friends.js');

module.exports = function(app){
    app.get('/api/friends', function (req, res){
        res.json(friends);
    });

    app.post('/api/friends', function(req, res){

        var newFriend = req.body;
        console.log(newFriend)
        for(var i = 0; i< newFriend.scores.length; i++){
            if(newFriend.scores[i]== "1(Strongly disagree)"){
                newFriend.scores[i]= 1;
            }else if (newFriend.scores[i]=="5(Strongly agree)"){
                newFriend.scores[i]= 5;
            }else {
                newFriend.scores[i] = parseInt(newFriend.scores[i]);
            }
        }
        var comparisonArray = [];
        for(var i = 0; i < friends.length; i++);
        var comparedFriend = friends[i];
        var totalDifference = 0

        for(var k =0; k < comparedFriend.scores.length; k++){
            var differenceOneScore = Math.abs(comparedFriend.scores[k]- newFriend.scores[k]);
            totalDifference += differenceOneScore;
        }

        comparisonArray[i] = totalDifference;

        var bestFriendNum = comparisonArray[0];
        var bestFriend = 0;

        for(var i = 1; i< comparisonArray.length; i ++){
            if(comparisonArray[i]< bestFriendNum){
                bestFriendNum = comparisonArray[i];
                bestFriend = i;
            }
        }

        friends.push(newFriend);
        
        res.json(friends[bestFriendI]);
        console.log(newFriend);
    });
}