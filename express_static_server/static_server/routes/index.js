var express = require('express');
var router = express.Router();

var fs = require('fs');

/* GET home page. */
router.get('*', function (req, res, next) {
  res.send(fs.readFileSync('./dist/index.html', 'utf8'));
});

module.exports = router;
