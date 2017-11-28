var express = require('express');
var playerService = require('./player-service.js');
var router = express.Router();
let Responder = require('../util/responder');

router.get('/', function(req, res) {
    playerService.getAll(new Responder(res));
});

router.get('/:id', function(req, res) {

});

router.post('/', function(req, res) {
    playerService.add(new Responder(res), req.body);
});

module.exports = router;
