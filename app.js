var express= require("express")
var mysql = require("mysql");
var myconnection = require("express-myconnection")
exphbs  = require('express-handlebars')
var path = require('path')

var app = express();
userMethods =require('./routes/user')
userDataService = require('./dataServices/userDataService'),
featureMethods =require('./routes/feature')
songMethods =require('./routes/songs')
songDataService = require('./dataServices/songDataService'),
videoMethods =require('./routes/videos')
videoDataService = require('./dataServices/videoDataService'),
ConnectionProvider = require('./routes/connectionProvider');

var dbOptions = {
 host: 'localhost',
  user: 'root',
  password: 'theaya5379',
  port: 3306,
  database: 'kriss'
};
var serviceSetupCallback = function(connection){
	return {
    songDataServ : new songDataService(connection),
    videoDataServ : new videoDataService(connection),
    userDataServ : new userDataService(connection)
	}
};


var myConnectionProvider = new ConnectionProvider(dbOptions, serviceSetupCallback);
app.use(myConnectionProvider.setupProvider);
app.use(myconnection(mysql, dbOptions, 'pool'));
app.use(express.static('public'))

app.engine('handlebars', exphbs({defaultLayout: 'index'}));
app.set('view engine', 'handlebars');

var feature = new featureMethods();
var songs = new songMethods();
var videos = new videoMethods();
var user = new userMethods();

app.get('/',feature.getFeatured)
app.get('/music',songs.getAll)
app.get('/videos',videos.getAll)

app.listen(5000)
