let express = require('express');
let router = express.Router();

router.use('/auth', require('./auth'))
router.use('/servers', require('./manage'))

router.get('/', function(req, res, next) {
  res.render('index', {user: req.user});
});

module.exports = router;
