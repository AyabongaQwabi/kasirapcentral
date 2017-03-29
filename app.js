var express= require("express");
var mysql = require("mysql");
var myconnection = require("express-myconnection");
var fileUpload = require('express-fileupload');
exphbs  = require('express-handlebars');
var path = require('path');
var bodyParser = require('body-parser');

var app = express();
userMethods =require('./routes/user')
userDataService = require('./dataServices/userDataService'),
eventDataService = require('./dataServices/eventDataService'),
imageDataService = require('./dataServices/imageDataservice'),
bioDataService = require('./dataServices/bioDataservice'),
featureDataService = require('./dataServices/featureDataservice'),
featureMethods =require('./routes/feature'),
songMethods =require('./routes/songs'),
uploadMethods =require('./routes/upload'),
songDataService = require('./dataServices/songDataService'),
videoMethods =require('./routes/videos'),
videoDataService = require('./dataServices/videoDataService'),
ConnectionProvider = require('./routes/connectionProvider');

var dbOptions = {
 host: 'localhost',
  user: 'root',
  password: '@theaya5379085;',
  port: 3306,
  database: 'kriss'
};
var serviceSetupCallback = function(connection){
	return {
    songDataServ : new songDataService(connection),
    videoDataServ : new videoDataService(connection),
    userDataServ : new userDataService(connection),
    eventDataServ : new eventDataService(connection),
    imageDataServ : new imageDataService(connection),
    bioDataServ : new bioDataService(connection),
    featureDataServ : new featureDataService(connection)
	}
};


var myConnectionProvider = new ConnectionProvider(dbOptions, serviceSetupCallback);
app.use(myConnectionProvider.setupProvider);
app.use(myconnection(mysql, dbOptions, 'pool'));
app.use(express.static('public'))
app.use(fileUpload());

app.engine('handlebars', exphbs({defaultLayout: 'index'}));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var feature = new featureMethods();
var songs = new songMethods();
var videos = new videoMethods();
var user = new userMethods();
var upload = new uploadMethods();

app.get('/',feature.getFeatured)
app.get('/music',songs.getAll)
app.get('/videos',videos.getAll)
app.post('/update/flame',songs.updateFlameCount)
app.post('/update/download',songs.updateDownloadCount)
app.post('/update/play',songs.updatePlayCount)
app.get('/upload',upload.setup)
app.post('/upload',upload.storeFile)
app.get('/songlist',songs.getAll)
app.get('/versus/setup',songs.getSetupVersus)
app.post('/versus/setup',songs.setVersus)
app.get('/versus',songs.getVersus)
app.get('/s/:songid',songs.getSong)
app.post('/s/find',songs.find)
/*app.get('/a/:artistname',songs.getArtist)*/
app.listen(80)
