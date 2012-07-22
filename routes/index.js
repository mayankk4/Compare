
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express | Home' });
};

exports.auth = function(req, res){
  res.render('auth', { title: 'Express | Login' });
};

exports.admin = function(req, res){
  res.render('admin', { title: 'Express | Admin' });
};