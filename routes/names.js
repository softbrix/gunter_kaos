var express = require('express');
var router = express.Router();
var _ = require('lodash');

/*
 * GET userlist.
 */
router.get('/list', function(req, res) {
    var db = req.db;
    var collection = db.get('nameslist');
    collection.find({},{},function(e,names){

    /*var names= [{name: 'Agaton', sex: 'M', score: 10},
                {name: 'Arvid', sex: 'M', score: 14},
                {name: 'Anna', sex: 'F', score: 11},
                {name: 'Alicia', sex: 'F', score: 14}];*/
        res.json(names);
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
    var collection = db.get('nameslist');
    var newName = {
      score: 0,
      name: req.body.name,
      sex: req.body.sex
    };

    collection.insert(newName, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});

/*
 * DELETE to deleteuser.
 */
router.delete('/delete/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('nameslist');
    var userToDelete = req.params.id;
    collection.remove({ '_id' : userToDelete }, function(err) {
        res.send((err === null) ? { msg: '' } : { msg:'error: ' + err });
    });
});

module.exports = router;
