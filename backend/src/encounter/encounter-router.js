let express = require('express');
let router = express.Router();

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
