const express = require('express'),
    bodyParser = require('body-parser'),
    compression = require('compression'),
    names_route = require('./routes/names'),
    MongoClient = require('mongodb').MongoClient,
    
    app = express(),
    DATABASE_URL = process.env.MONGODB_URI || 'mongodb://localhost:27017/gunter_kaos'
    PORT = process.env.PORT || 3001
    
var db;

// Test the mongo connection
MongoClient.connect(DATABASE_URL, function(err, client) {
  if(err === null) {
    console.log("Connected correctly to Mongo database server");
    db = client.db();
    console.log(db);
  } else {
    console.error(err);
    process.exit(1);
  }
});

// in order to serve files, you should add the two following middlewares
app.use(bodyParser.json());
app.use(compression());
app.use(express.static(__dirname + '/app'));

// Make our db accessible to our router
app.use((req,res,next) => {
  req.db = db;
  next();
});
app.use('/names', names_route);

app.listen(PORT, function(){
    console.log("Working on port " + PORT);
});
