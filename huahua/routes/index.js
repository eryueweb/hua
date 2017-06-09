var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.html');
});
router.get('/pic', function(req, res, next) {
  res.render('pic.html');
});
router.get('/state', function(req, res, next) {
  res.render('state.html');
});
router.get('/blog', function(req, res, next) {
  res.render('blogList.html');
});
router.get('/blogDetail', function(req, res, next) {
  res.render('blogDetail.html');
});
router.get('/proInfo', function(req, res, next) {
  res.render('projectInfo.html');
});

module.exports = router;
