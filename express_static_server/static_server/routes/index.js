var express = require('express');
var router = express.Router();

var fs = require('fs');

/* GET home page. */
router.get('*', function (req, res, next) {
  console.log(1);
  console.log(req);
  res.send(fs.readFileSync('./dist/index.html', 'utf8'));
});

module.exports = router;
