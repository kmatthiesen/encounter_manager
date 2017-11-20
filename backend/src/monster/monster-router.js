var express = require('express');
var monsterService = require('./monster-service.js');
var router = express.Router();
let Responder = require('../util/responder');

router.get('/', function(req, res) {
    monsterService.getAll(new Responder(res));
});

/* GET home page. */
router.get('/:id', function(req, res) {

});

/* GET home page. */
router.post('/', function(req, res) {
    monsterService.add(new Responder(res), req.body);
});

module.exports = router;
