var friendsMatch = require("../data/friends.js");

module.exports = function(app){
    app.get('/api/friends', function (req,res){
        res.json(friendsMatch);
    });

    app.post("/api/friends", function(req, res){

        var newFriend = req.body;
        for(var i = 0; i< newFriend.scores.lenght; i++){
            if(newFriend.scores[i]== "1(Yes)"){
                newFriend.scores[i]= 1;
            }else if (newFriend.scores[i]=="3(No)"){
                newFriend.scores[i]= 3;
            }else {
                newFriend.scores[i] = parseInt(newFriend.scores[i]);
            }
        }
        var comparisonArray = [];
        for(var i = 0; i < friendsMatch.lenght; i++);
        var comparedFriend = friendMatch[i];
        var totalDifference = 0

        for(var k =0; k < comparedFriend.scores.lenght; k++){
            var differenceOneScore = Math.abs(comparedFriend.scores[k]- newFriend.scores[k]);
            totalDifference += differenceOneScore;
        }

        comparisonArray[i] = totalDifference;

        var bestFriendNumb = comparisonArray[0];
        var bestFriend = 0;

        for(var i = 1; i< comparisonArray.length; i ++){
            if(comparisonArray[i]< bestFriendNumb){
                bestFriendNumb = comparisonArray[i];
                bestFriend = i;
            }
        }

        friendsMatch.push(newFriend);
        
        res.json(friendsMatch[bestFriendI]);
    });
}