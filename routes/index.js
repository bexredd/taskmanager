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
pirority:Number,
estTime: Number,
participatingUsers:[{
    type: String
}]
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
    var newTask = new task({title: reqTask.title, start:reqTask.start, end: reqTask.end, priority:1, estTime:1, participatingUsers:[]});
    newTask.save(function(err, post) { //[4]
        if (err) return console.error(err);
        console.log(post);
         res.sendStatus(200);
    });
});

module.exports = router;
