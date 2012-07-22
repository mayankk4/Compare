/**
 * @Author : @cyclotrojan
 * @Inception : July 17, 2012
 * @Project : Compare-Framework
 */

////////////////////////////////////////////  Module dependencies. ///////////////////////////////////////
 
var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , crypto = require('crypto') // hashing the name
  , fs = require('fs'); // forever

var app = express();

// create access.log file
var access_logfile = fs.createWriteStream('./logs/access.log', {flags: 'a'});


app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs'); // using ejs templating engine

  /////////////middlewares////////////////
  app.use(express.favicon());
  app.use(express.logger({stream: access_logfile })); // express.logger({ format: ':method :url :status :response-time' });

  app.use(express.cookieParser()); // session
  app.use(express.session({secret: "compare"})); // session

  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});


//////////////////////// Setting up development and production environments //////////////////////////////
app.configure('development', function(){
  app.use(express.logger());
  app.use(express.errorHandler({
    dumpExceptions : true,
    showStack : true
  }));
});

app.configure('production', function(){
  app.use(express.logger());
  app.use(express.errorHandler());
});



//////////////////////////////////////////// Config variables //////////////////////////////////////////////
var total_images = 34; // total images in the system
var hashkey = "cycL0Sp!rIt"; // for hashing images
var adminHash = "36b15e3125"; // changes after every login so automatically disables other logins

////////////////////////////////////////////  Routes  ///////////////////////////////////////////////////////

app.get('/', routes.index);

app.get('/admin', checkAuth, routes.admin);

app.get('/auth', routes.auth);

/////////////////////////////////////////// Handling Ajax requests ////////////////////////////////////////////

// Login service
app.post('/login', function (req, res) {
  var post = req.body;
  console.log("Adming login - username - " + post.username + " password - " + post.password);

  if(post.username == 'admin' && post.password == 'avipar123') {
    adminHash = generateAdminId();
    req.session.user_id = adminHash;

    res.contentType('application/json');
    var data = JSON.stringify('/admin')
    res.header('Content-Length', data.length);
    res.end(data);
  }else{
    res.contentType('application/json');
    var data = JSON.stringify('/auth');
    res.header('Content-Length', data.length);
    res.end(data);
  }
});

// Logout service
app.get('/logout', function (req, res) {
    delete req.session.user_id;
    res.contentType('application/json');
    var data = JSON.stringify('/auth');
    res.header('Content-Length', data.length);
    res.end(data);
});

// Save vote for given image id
app.post('/saveVote', function (req, res){
  var post = req.body;
  var imageId = post.imageId;
  console.log("Saving vote for image " + imageId);

  // M O N G O

  
  res.end();
});

// Serves 2 random images
app.get('/service', function(req,res){

  try{
    var firstImage = Math.floor((Math.random()*total_images)+1); // random number between 1 and total_images
    var secondImage = Math.floor((Math.random()*total_images)+1); // random number between 1 and total_images

    // One time check
    while(secondImage==firstImage){
      secondImage = Math.floor((Math.random()*total_images)+1); // random number between 1 and 30
    }

    // hash the numbers
    var firstImageHash = crypto.createHmac('sha1', hashkey).update(firstImage.toString()).digest('hex');

    var secondImageHash = crypto.createHmac('sha1', hashkey).update(secondImage.toString()).digest('hex');

    // Get the entries from mongodb

    // get votes from mongodb
    var  firstImageVotes = Math.floor((Math.random()*100)+1); ;
    var  secondImageVotes = Math.floor((Math.random()*100)+1); ;

    // get views from mongodb
    var  firstImageViews = Math.floor((Math.random()*1000)+1); ;
    var  secondImageViews = Math.floor((Math.random()*1000)+1); ;

    // Increase the number of views in the db -
    // Save instance

    var json_return = { "status": 200, 
                        "first": { "id": firstImageHash, "votes" : firstImageVotes, "views" : firstImageViews},  
                        "second": { "id" : secondImageHash, "votes" : secondImageVotes, "views" : secondImageViews}
                     };
    res.send(json_return); // CHANGED response.send to response.end

  }catch(err){
    var json_return = { "status": 500};
    res.send(json_return);
    console.log("Error:", err);
  }

});

/////////////////////////////////// GENERAL FUNCTIONS ////////////////////////////////////////////////////////

function checkAuth(req, res, next) {
  if (!req.session.user_id || req.session.user_id != adminHash) {
    // res.send('You are not authorized to view this page');
    res.redirect("/auth");
  } else {
    next();
  }
}

function generateAdminId(){
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for( var i=0; i < 10; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}
/////////////////////////////////// Listen on 3000 ////////////////////////////////////////////////////////////

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});










