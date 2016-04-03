var DATABASE_URL = 'localhost:27017/gunter_kaos';

var express = require('express'),
    bodyParser = require('body-parser'),
    compression = require('compression'),
    h5bp = require('h5bp'),
    names_route = require('./routes/names'),
    MongoClient = require('mongodb').MongoClient,
    db = require('monk')(DATABASE_URL);

var app = express();
app.use(h5bp({
    root: __dirname + '/app'
  }));

MongoClient.connect('mongodb://'+DATABASE_URL, function(err, db) {
  if(err === null) {
    console.log("Connected correctly to Mongo database server: ", DATABASE_URL);
    db.close();
  } else {
    console.error(err);
    exit();
  }
});

// Make our db accessible to our router
app.use(function(req,res,next){
    req.db = db;
    next();
});


// in order to serve files, you should add the two following middlewares
app.use(bodyParser.json());
app.use(compression());
app.use(express.static(__dirname + '/app'));

app.use('/names', names_route);

app.listen(3000,function(){
    console.log("Working on port 3000");
});
