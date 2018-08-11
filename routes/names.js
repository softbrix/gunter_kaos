var express = require('express');
var router = express.Router();
var _ = require('lodash');

var DB_NAME = 'nameslist';

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
    console.log("ERROR: " + reason);
    res.status(code || 500).json({"error": message});
  }

/*
 * GET userlist.
 */
router.get('/list', function(req, res) {
    req.db.collection(DB_NAME).find({}).toArray(function(err, docs) {
        if (err) {
          handleError(res, err.message, "Failed to get contacts.");
        } else {
          res.status(200).json(docs);
        }
      });
});

/*
 * POST to adduser.
 */
router.post('/add', function(req, res) {
    if(_.isEmpty(req.body.name) || _.isEmpty(req.body.sex)) {
      res.send('Missing parameter name and/or sex');
      return;
    }

    var db = req.db;
    var newName = {
      score: 0,
      name: req.body.name,
      sex: req.body.sex
    };

    db.collection(DB_NAME).insertOne(newName, function(err, doc) {
        if (err) {
          handleError(res, err.message, "Failed to create new contact.");
        } else {
          res.status(201).json(doc.ops[0]);
        }
    });
});

/*
 * POST to adduser.
 */
router.post('/addscores', function(req, res) {
    if(_.isEmpty(req.body.items)) {
      res.send('Missing data to add');
      return;
    }

    var db = req.db;
    var collection = db.get(DB_NAME);

    _.each(req.body.items, function(itm){
      console.log(itm);
      collection.update(
         { _id: itm.id },
         { $push: { scores: itm.score } }
       );
    });
    res.send('Saved');
});

/*
 * DELETE to deleteuser.
 */
router.delete('/delete/:id', function(req, res) {
    var db = req.db;
    var collection = db.get(DB_NAME);
    var userToDelete = req.params.id;
    collection.remove({ '_id' : userToDelete }, function(err) {
        res.send((err === null) ? { msg: '' } : { msg:'error: ' + err });
    });
});

module.exports = router;
