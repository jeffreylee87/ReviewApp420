var dinnder = require("../data/friends");

module.exports = function(app) {

    app.get("/api/friends", function(req, res) {
        res.json(dinnder);
      });


      app.post("/api/friends", function(req, res) {
        var newProfile = req.body.scores;
        var matcher = 0;
        var totalList = [];

        //nested for loop to iterate through first array containing all objects and second array containing scores
        for (var x in dinnder){
            //this will take in the total score
            var totalScore = 0;
            for (var y in newProfile){
                //total score grabs the entire compared score through the first iteration, if you put it outside, it iterates through the whole thing
                totalScore += Math.abs(parseInt(dinnder[x].scores[y]) - parseInt(newProfile[y]));
            }
            //gets all the total scores pushed into an array
            totalList.push(totalScore);
            
        }

        //loops through the list to check which is the lowest number
        for(var i in totalList){
           if(totalList[i] <= totalList[matcher]){
            matcher = i;
           } 
           
        }
         
        res.json(dinnder[matcher]);

        dinnder.push(req.body);
      });





}