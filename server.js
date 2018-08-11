var DATABASE_URL = process.env.MONGODB_URI || 'mongodb://localhost:27017/gunter_kaos';

var express = require('express'),
    bodyParser = require('body-parser'),
    compression = require('compression'),
    names_route = require('./routes/names'),
    MongoClient = require('mongodb').MongoClient,
    db = require('monk')(DATABASE_URL);

var app = express();

// Test the mongo connection
MongoClient.connect(DATABASE_URL, function(err, db) {
  if(err === null) {
    console.log("Connected correctly to Mongo database server");
    db.close();
  } else {
    console.error(err);
    process.exit(1);
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

const port = process.env.PORT || 3001;
app.listen(port, function(){
    console.log("Working on port " + port);
});
