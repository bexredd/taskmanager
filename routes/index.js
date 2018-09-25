var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

//connect to mongo
mongoose.connect('mongodb://localhost/taskDB', { useNewUrlParser: true });

/*create schema.
Date is both date and time\
Priority is an int between 1-3 (1 being the highest)
est time is and int of est. hours
part. Users is a list of usernames. */

var taskSchema = mongoose.Schema({ 
title: String,
start: Date, 
end: Date,
priority:Number,
estTime: Number,
participatingUsers:[{
    type: String
}],
status: String
});


var task = mongoose.model('task', taskSchema); 
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Connected');
});


//create task and add to db
router.post('/task', function(req, res, next) {
    var reqTask= req.body;
    var newTask = new task({title: reqTask.title, start:reqTask.start, end: reqTask.end, priority:reqTask.priority, estTime:reqTask.estTime, participatingUsers:[], status:"Task created"});
    newTask.save(function(err, post) {
        if (err) return console.error(err);
        console.log(post);
         res.sendStatus(200);
    });
});

// GET tasks from mongo
router.get('/task', function(req, res, next) {
    task.find(function(err,taskList) { 
        if (err) return console.error(err); 
        else {
            res.json(taskList);
        }
})
});

//PUT edit tasks in mongo
router.put('/task', function(req,res,next){
    console.log("in put method!");
    console.log(req.body._id);
   task.findById(req.body._id, function(err, task){
       if (err) return console.error(err);
       else{
            task.status = req.body.status;
            task.save(function(err){
                if (err) return  console.error(err);
                res.sendStatus(200);
            })
       }
   });
});

module.exports = router;
